// Fonction Validation Third-part : HTML5 Wave Lighthouse
function thirdPartValidation() {
  let validator_p, wave_p, lighthouse_p;
  let lighthouseAPIKey = '';
  let waveAPIKey = '';

  if (!only_redactor && !only_error && run_html5) {
    // Fonction Validator HTML5
    const validatorUrl = 'https://validator.nu/?out=json';
    async function validator(url = validatorUrl) {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: new XMLSerializer().serializeToString(document)
      });
      return response.json();
    }

    validator_p = Promise.resolve(validator());
    validator_p.then((data) => {
      //console.log(data);
      let elem = document.getElementById('result_html5');
      // Filter data result
      const filterStrings = [
        'role is unnecessary for element',
        'Section lacks heading',
        'Bad value “” for attribute “id” on element “script”',
        'Attribute “screen_capture_injected” not allowed',
        'A “figure” element with a “figcaption” descendant must not have a “role” attribute',
        'Element “meta” is missing required attribute “content”',
        'Element “meta” is missing one or more of the following attributes: “content”, “property”',
        'Element “style” not allowed as child of element “div” in this context. (Suppressing further errors from this subtree.)',
        'CSS: Parse Error.',
        'Attribute “value” not allowed on element “meta” at this point.',
        'Bad value “opt-in” for attribute “type” on element “script”',
        'Element “script” must not have attribute “async” unless attribute “src” is also specified or unless attribute “type” is specified with value “module”'
      ].join('|');
      const error = data.messages.filter(
        (msg) =>
          msg.type === 'error' && msg?.message.match(filterStrings) === null
      );
      let msg_html5 = '';

      if (error.length) {
        console.group(
          `%c${error.length} validation errors`,
          'background-color:#D93025;color:#FFF;padding:1px 4px'
        );
        error.forEach((msg) => {
          console.groupCollapsed(
            `%c${msg.message} (line: ${msg.lastLine})`,
            'color:#D93025'
          );
          console.table(msg);
          result_html5_nb++;
          msg_html5 +=
            '<li>' + msg.message + ' (line: ' + msg.lastLine + ')</li>';
          console.groupEnd();
        });
        console.groupEnd();
        if (msg_html5 != '') {
          elem.innerHTML += '<ul>' + msg_html5 + '</ul>';
          result_html5 = '{details : ' + msg_html5 + '}';
        }
      } else {
        elem.innerHTML += ' Aucune erreur détéctée';
        result_html5 = '{}';
      }
    });

    if (!isPreview && isAEM && run_lighthouse) {
      // Fonction LightHouse
      // Recuperer les options (profile)
      chrome.storage.sync.get(['lighthouse_key'], function (sync) {
        if (sync.lighthouse_key && sync.lighthouse_key != undefined && sync.lighthouse_key != '') {
          console.log('$_lighthouse_key : ' + sync.lighthouse_key);
          lighthouseAPIKey = sync.lighthouse_key;
        }
      });

      // Création de l'URL
      const lighthouseUrl =
        'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
      let lighthouseOptions =
        'locale=fr-FR&category=accessibility&category=best-practices&category=seo';
      if (lighthouseAPIKey != '') {
        lighthouseOptions += '&key=' + lighthouseAPIKey;
      }
      if (currentWidth > 500) {
        lighthouseOptions += '&strategy=desktop';
      } else {
        lighthouseOptions += '&strategy=mobile';
      }

      async function lighthouse(url = lighthouseUrl) {
        const response = await fetch(
          url +
            '?' +
            lighthouseOptions +
            '&url=' +
            encodeURIComponent(currentUrl),
          {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
          }
        );
        return response.json();
      }
      console.log(
        lighthouseUrl +
          '?' +
          lighthouseOptions +
          '&url=' +
          encodeURIComponent(currentUrl)
      );
      lighthouse_p = Promise.resolve(lighthouse());
      lighthouse_p.then((data) => {
        if (data.lighthouseResult) {
          console.log(data.lighthouseResult.categories);

          // Filter data result
          let lighthouse_access_score =
            data.lighthouseResult.categories['accessibility'].score * 100;
          let lighthouse_bp_score =
            data.lighthouseResult.categories['best-practices'].score * 100;
          let lighthouse_seo_score =
            data.lighthouseResult.categories['seo'].score * 100;

          //Save values for bdd
          result_lighthouse_access = lighthouse_access_score;
          result_lighthouse_bp = lighthouse_bp_score;
          result_lighthouse_seo = lighthouse_seo_score;

          if (lighthouse_access_score < 80)
            lighthouse_access_score =
              '<span style="color:red;" class="result_lighthouse_access">' +
              lighthouse_access_score +
              '</span>';
          else
            lighthouse_access_score =
              '<span class="result_lighthouse_access">' +
              lighthouse_access_score +
              '</span>';
          lighthouse_access_score =
            'Accessibility : ' + lighthouse_access_score + '/100</li>';
          if (lighthouse_access_score < 80)
            '<li class="label-error">' + lighthouse_access_score;
          else lighthouse_access_score = '<li>' + lighthouse_access_score;

          if (lighthouse_bp_score < 80)
            lighthouse_bp_score =
              '<span style="color:red;" class="result_lighthouse_bp">' +
              lighthouse_bp_score +
              '</span>';
          else
            lighthouse_bp_score =
              '<span class="result_lighthouse_bp">' +
              lighthouse_bp_score +
              '</span>';
          lighthouse_bp_score =
            'Best practices : ' + lighthouse_bp_score + '/100</li>';
          if (lighthouse_bp_score < 80)
            '<li class="label-error">' + lighthouse_bp_score;
          else lighthouse_bp_score = '<li>' + lighthouse_bp_score;

          if (lighthouse_seo_score < 80)
            lighthouse_seo_score =
              '<span style="color:red;" class="result_lighthouse_seo">' +
              lighthouse_seo_score +
              '</span>';
          else
            lighthouse_seo_score =
              '<span class="result_lighthouse_seo">' +
              lighthouse_seo_score +
              '</span>';
          lighthouse_seo_score = 'SEO : ' + lighthouse_seo_score + '/100</li>';
          if (lighthouse_seo_score < 80)
            '<li class="label-error">' + lighthouse_seo_score;
          else lighthouse_seo_score = '<li>' + lighthouse_seo_score;

          const lighthouse_msg =
            lighthouse_access_score +
            lighthouse_bp_score +
            lighthouse_seo_score;

          let elem = document.getElementById('result_lighthouse');
          elem.innerHTML += '<ul>' + lighthouse_msg + '</ul>';
          result_lighthouse =
            '{Accessibility : ' +
            lighthouse_access_score +
            ',"Best practices" : ' +
            lighthouse_bp_score +
            ',Seo : ' +
            lighthouse_seo_score +
            '}';
        } else if (data.error) {
          console.log(data.error.message);
        } else {
          console.log('Lighthouse error');
        }
      });
    }
    if (!isPreview && isAEM && run_wave && waveAPIKey != '') {
      // Fonction Wave
      // Recuperer les options (profile)
      chrome.storage.sync.get(['wave_key'], function (sync) {
        if (sync.wave_key && sync.wave_key != undefined && sync.wave_key != '') {
          console.log('$_wave_key : ' + sync.wave_key);
          waveAPIKey = sync.wave_key;
        }
      });

      // Création de l'URL
      const waveUrl =
        'https://wave.webaim.org/api/request?&url=https://google.com/';
      let waveOptions = 'key=' + waveAPIKey + '&format=json&reporttype=1';

      async function wave(url = waveUrl) {
        const response = await fetch(
          url + '?' + waveOptions + '&url=' + encodeURIComponent(currentUrl),
          {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'text/html;charset=UTF-8' },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
          }
        );
        return response.json();
      }

      let wave_p = Promise.resolve(wave());
      wave_p.then((data) => {
        console.log(data);

        // Filter data result
        const creditsremaining = data.statistics.creditsremaining;
        const wave_error = data.categories.error.count;
        const wave_contrast = data.categories.contrast.count;
        const wave_alert = data.categories.alert.count;
        const wave_feature = data.categories.feature.count;
        const wave_structure = data.categories.structure.count;
        const wave_aria = data.categories.aria.count;

        let wave_msg =
          '<li>Error : ' +
          wave_error +
          '</li><li>Contrast : ' +
          wave_contrast +
          '</li><li>Alert : ' +
          wave_alert +
          '</li><li>Feature : ' +
          wave_feature +
          '</li><li>Structure : ' +
          wave_structure +
          '</li><li>Aria : ' +
          wave_aria +
          '</li>';

        let elem = document.getElementById('result_wave');
        elem.innerHTML += '<ul>' + wave_msg + '</ul>';

        result_wave =
          '{Error : ' +
          wave_error +
          ',Contrast : ' +
          wave_contrast +
          ',Alert : ' +
          wave_alert +
          ',Feature : ' +
          wave_feature +
          ',Structure : ' +
          wave_structure +
          ',Aria : ' +
          wave_aria +
          '}';
      });
    }

    if (run_html5 && run_lighthouse && run_wave) {
      // Set data to Bdd
      Promise.all([lighthouse_p, validator_p, wave_p]).then(function () {
        setTimeout(saveResultsInBdd(), 100);
      });
    } else if ((run_html5, run_lighthouse)) {
      // Set data to Bdd
      Promise.all([lighthouse_p, validator_p]).then(function () {
        setTimeout(saveResultsInBdd(), 100);
      });
    }
    // Sauvegarde les infos de la decla en Bdd
    if (isDecla && !isPreview && save_to_db) {
      saveDeclaInBdd();
    }
  }
}

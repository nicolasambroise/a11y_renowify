/* Script Check A11Y Renowify Manual*/
// Note : Préfix NIA pour "Navigator Inspector for Accessibility" à modifier par qqch en rapport avec Renow

const pluginUrl = 'https://webux.gouv.etat.lu/a11y/a11y_renowify_vite';

function run_renowify_static(debug, redac, nc) {
  /*- -------------------------------------------------------------------------------- */
  // clean console
  console.clear();

  console.log('== Init Plugin Renowify');

  /*- -------------------------------------------------------------------------------- */
  // Add JS
  // - double sécurité pour que ce sript puisse également être appelé par l'extention chrome
  if (!document.body.classList.contains('renowify-script-injected')) {
    /* Pour le bookmarklet */
    console.log('== Start Bookmarklet Renowify ==');
    loadStyle(pluginUrl);
    var script_loaded = loadScript(pluginUrl);

    Promise.all([script_loaded])
      .then(function () {
        setTimeout(beforeCheck(), 100);
      })
      .then(function () {
        var p01 = new Promise(function (resolve) {
          check_part_01();
          setTimeout(resolve, 100);
        });
        var p02 = new Promise(function (resolve) {
          check_part_02();
          setTimeout(resolve, 100);
        });
        var p03 = new Promise(function (resolve) {
          check_part_03();
          setTimeout(resolve, 100);
        });
        var p04 = new Promise(function (resolve) {
          check_part_04();
          setTimeout(resolve, 100);
        });
        var p05 = new Promise(function (resolve) {
          check_part_05();
          setTimeout(resolve, 100);
        });
        var p06 = new Promise(function (resolve) {
          check_part_06();
          setTimeout(resolve, 100);
        });
        var p07 = new Promise(function (resolve) {
          check_part_07();
          setTimeout(resolve, 100);
        });
        var p08 = new Promise(function (resolve) {
          check_part_08();
          setTimeout(resolve, 100);
        });
        var p09 = new Promise(function (resolve) {
          check_part_09();
          setTimeout(resolve, 100);
        });
        var p10 = new Promise(function (resolve) {
          check_part_10();
          setTimeout(resolve, 100);
        });
        var p11 = new Promise(function (resolve) {
          check_part_11();
          setTimeout(resolve, 100);
        });
        var p12 = new Promise(function (resolve) {
          check_part_12();
          setTimeout(resolve, 100);
        });
        var p13 = new Promise(function (resolve) {
          check_part_13();
          setTimeout(resolve, 100);
        });
        var p14 = new Promise(function (resolve) {
          check_part_14();
          setTimeout(resolve, 100);
        });
        var p15 = new Promise(function (resolve) {
          check_part_15();
          setTimeout(resolve, 100);
        });

        Promise.all([
          p01,
          p02,
          p03,
          p04,
          p05,
          p06,
          p07,
          p08,
          p09,
          p10,
          p11,
          p12,
          p13,
          p14,
          p15
        ])
          .then(function () {
            setTimeout(createResultPanel(), 100);
          })
          .then(function () {
            setTimeout(activateCheckA11YPanel(), 100);
          });
      })
      .then(function () {
        console.log('== End Bookmarklet Renowify ==');
      });
  }
}

// END
/*- -------------------------------------------------------------------------------- */

// fonction pour charger les scripts
function loadScript(pluginUrl) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script');
    script.id = 'renowify-script-injected';
    script.src = pluginUrl + '/assets/index.js?v=' + Date.now();

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error`));

    if (document.getElementById('renowify-script-injected') === null)
      document.head.append(script);
  });
}

// fonction pour charger le style
function loadStyle(pluginUrl) {
  return new Promise(function (resolve, reject) {
    let style = document.createElement('link');
    style.id = 'injected-css';
    style.rel = 'stylesheet';
    style.href = pluginUrl + '/assets/index.css?v=' + Date.now();

    style.onload = () => resolve(style);
    style.onerror = () => reject(new Error(`Style load error`));

    if (document.getElementById('renowify-style-injected') === null)
      document.head.append(style);
  });
}

if (!document.body.classList.contains('renowify-script-injected')) {
  // Environnement
  setTimeout(run_renowify_static(false, false, true), 100);
} else {
  alert("Merci de recharger la page avant d'effectuer un nouveau check !");
}

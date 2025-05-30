/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-03 Lien - Thématique RAWeb 6
 - Liste des liens internes et externe, affichage des attributs title des liens et vérification d’erreurs courantes.
 */
function check_part_03() {
  if (debug_flag) console.log('03 Liens');
  var url = window.location.host;
  if (!url) {
    return '';
  }

  // A. Verification de la présence du suffix sur les liens externe
  if (!only_redactor && !only_error) {
    const nia03a_nodes = document.querySelectorAll(
      'html[lang="fr"] a[target="_blank"]:not([title$="- Nouvelle fenêtre"]):not([title$="- Nouvelle fenêtre (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink), html[lang="fr"] a[title$="- Nouvelle fenêtre"]:not([target="_blank"]), html[lang="en"] a[target="_blank"]:not([title$="- New window"]):not([title$="- New window (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="en"] a[title$="- New window"]:not([target="_blank"]), html[lang="de"] a[target="_blank"]:not([title$="- Neues Fenster"]):not([title$="- Neues Fenster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="de"] a[title$="- Neues Fenster"]:not([target="_blank"]),html[lang="lb"] a[target="_blank"]:not([title$="- Nei Fënster"]):not([title$="- Nei Fënster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="lb"] a[title$="- Nei Fënster"]:not([target="_blank"])'
    );
    let nia03a_flag = false;
    let nia03a_lang;
    let nia03a_title;
    if (nia03a_nodes && nia03a_nodes.length > 0) {
      for (let i = 0; i < nia03a_nodes.length; i++) {
        if (isItemVisible(nia03a_nodes[i])) {
          nia03a_lang = nia03a_nodes[i].closest('[lang]').getAttribute('lang');
          nia03a_title = nia03a_nodes[i].getAttribute('title');
          if (
            !nia03a_title ||
            !(
              (nia03a_title &&
                nia03a_lang == 'en' &&
                nia03a_title.endsWith('- New window')) ||
              (nia03a_title &&
                nia03a_lang == 'fr' &&
                nia03a_title.endsWith('- Nouvelle fenêtre')) ||
              (nia03a_title &&
                nia03a_lang == 'de' &&
                nia03a_title.endsWith('- Neues Fenster')) ||
              (nia03a_title &&
                nia03a_lang == 'lb' &&
                nia03a_title.endsWith('- Nei Fënster'))
            )
          ) {
            setItemOutline(nia03a_nodes[i], 'yellow', 'nia03a', '03-A');
            nia03a_flag = true;
          }
        }
      }
    }
    if (nia03a_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia03a' class='result-focus label-yellow'>03-A</a> : Vérifier la présence de suffixe sur les liens externes [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/lutilisateur-est-averti-des-ouvertures-de-nouvelles-fenetres' target='_blank'>Opquast 141</a>]</li>"
      );
    }
  }

  // B. Verification de titre vide
  const nia03b_nodes = document.querySelectorAll(
    'a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"]'
  );
  if (nia03b_nodes && nia03b_nodes.length > 0 && isItemsVisible(nia03b_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03b' class='result-focus label-red'>03-B</a> : Vérifier qu'il n'y a pas de lien avec un titre non pertinant [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6.1.1' target='_blank'>RAWeb 6.1.1</a>]</li>"
    );
    setItemsOutline(nia03b_nodes, 'red', 'nia03b', '03-B');
  }

  // C. Probleme de lang
  if (!only_redactor) {
    const nia03c_nodes = document.querySelectorAll(
      'html:not([lang="fr"]) *:not(.book-download) > a[title$="- Nouvelle fenêtre"]:not([lang="fr"]), html:not([lang="en"]) *:not(.book-download) > a[title$="- New window"]:not([lang="en"]), html:not([lang="de"]) *:not(.book-download) > a[title$="- Neues Fenster"]:not([lang="de"]), html:not([lang="lb"]) *:not(.book-download) > a[title$="- Nei Fënster"]:not([lang="lb"])'
    );
    if (
      nia03c_nodes &&
      nia03c_nodes.length > 0 &&
      isItemsVisible(nia03c_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia03c' class='result-focus label-orange'>03-C</a> : Présence du suffixe 'Nouvelle fenêtre' sur une page non rédiger en français (de même pour les autres langues)</li>"
      );
      setItemsOutline(nia03c_nodes, 'orange', 'nia03c', '03-C');
    }
  }

  // D. Présence d'un conflit dans les attribut de liens
  if (!only_redactor) {
    const nia03d_nodes = document.querySelectorAll(
      'a[aria-label][aria-labelledby]'
    );
    if (
      nia03d_nodes &&
      nia03d_nodes.length > 0 &&
      isItemsVisible(nia03d_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia03d' class='result-focus label-red'>03-D</a> : Présence d'un conflit dans les attributs des liens</li>"
      );
      setItemsOutline(nia03d_nodes, 'red', 'nia03d', '03-D');
    }
  }

  // E. Vérifier que le title reprend à minimum le contenu textuel
  const nia03e_nodes = document.querySelectorAll('a[title]');
  let nia03e_flag = false;
  let nia03e_content = '',
    nia03e_title = '',
    nia03e_lang = '',
    nia03e_innerText = '';
  if (nia03e_nodes && nia03e_nodes.length > 0) {
    for (let i = 0; i < nia03e_nodes.length; i++) {
      if (isItemVisible(nia03e_nodes[i])) {
        nia03e_lang = nia03e_nodes[i].closest('[lang]').getAttribute('lang');
        nia03e_title = sanitizeText(
          nia03e_nodes[i].getAttribute('title'),
          nia03e_lang
        );
        nia03e_innerText = nia03e_nodes[i].innerText;
        //console.log(nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length);
        if (
          nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length > 0
        ) {
          for (
            let j = 0;
            j < nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length;
            j++
          ) {
            //console.log(nia03e_nodes[i].getElementsByClassName('checkA11YSpan')[j]);
            nia03e_innerText = nia03e_innerText.replace(
              nia03e_nodes[i].getElementsByClassName('checkA11YSpan')[j]
                .textContent,
              ''
            );
          }
        }
        nia03e_content = sanitizeText(nia03e_innerText, nia03e_lang);
        if (
          !nia03e_title.includes(nia03e_content) &&
          !nia03e_title.includes(
            nia03e_content.replace(/(pdf)([1-9])/, '$1 $2')
          )
        ) {
          if (debug_flag) {
            console.log(
              '%cERROR',
              'font-weight:700;color:darkred',
              '[' + nia03e_title + '] VS [' + nia03e_content + '] '
            );
          }
          setItemOutline(nia03e_nodes[i], 'red', 'nia03e', '03-E');
          nia03e_flag = true;
        }
      }
    }
  }
  if (nia03e_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03e' class='result-focus label-red'>03-E</a> : Présence de liens dont l'attribut title ne reprend pas le contenu textuel [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>]</li>"
    );
  }

  // F. Chaque lien a t'il un intitulé
  const nia03f_nodes = document.querySelectorAll(
    'a[href]:not([href^="#"]),[role="link"][href]:not([href^="#"])'
  );
  let nia03f_flag = false;
  let nia03f_lang = '';
  if (nia03f_nodes && nia03f_nodes.length > 0) {
    for (let i = 0; i < nia03f_nodes.length; i++) {
      if (isItemVisible(nia03f_nodes[i])) {
        nia03f_lang = nia03f_nodes[i].closest('[lang]').getAttribute('lang');
        //Ni dans l'attribut title, ni dans le contenu textuel, ni dans l'attribut alt des images enfants
        if (
          !(
            nia03f_nodes[i].hasAttribute('title') &&
            sanitizeText(nia03f_nodes[i].getAttribute('title'), nia03f_lang)
              .length > 0
          ) &&
          sanitizeText(nia03f_nodes[i].innerText).length == 0 &&
          nia03f_nodes[i].querySelectorAll(
            'img:not([alt=""]):not([aria-hidden="true"]):not([hidden])'
          ).length == 0
        ) {
          setItemOutline(nia03f_nodes[i], 'red', 'nia03f', '03-F');
          nia03f_flag = true;
        }
      }
    }
  }
  if (nia03f_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03f' class='result-focus label-red'>03-F</a> : Présence de liens dont le contenu est vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-2-1' target='_blank'>RAWeb 6.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'>Opquast 131</a>]</li>"
    );
  }

  // G. Présence de liens sans href
  if (!only_error) {
    const nia03g_nodes = document.querySelectorAll(
      'a:not([href]),[role="link"]:not([href])'
    );
    if (
      nia03g_nodes &&
      nia03g_nodes.length > 0 &&
      isItemsVisible(nia03g_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03g' class='result-focus label-yellow'>03-G</a> : Présence d'un lien sans destination</li>"
      );
      setItemsOutline(nia03g_nodes, 'yellow', 'nia03g', '03-G');
    }
  }

  // H. Liens tel: mailto: fax:
  const nia03h_nodes = document.querySelectorAll(
    '*:not(.mcgyver-slot) > a[href^="mailto:"],a[href^="fax:"],a[href^="tel:"]'
  );
  let nia03h_flag = false;
  let nia03h_regexmail =
    /^((?=.+@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,}))$/;
  let nia03h_regexphone =
    /^((\+|00)|\((\+|00)[0-9]{1,4}\))?[0-9+\-\s().]*$/;
  let nia03h_content = '';

  if (nia03h_nodes && nia03h_nodes.length > 0) {
    for (let i = 0; i < nia03h_nodes.length; i++) {
      if (isItemVisible(nia03h_nodes[i])) {
        nia03h_content = nia03h_nodes[i].getAttribute('href');
        // Si mailto verification de la regex email
        if (
          nia03h_content.indexOf('mailto:') == 0 &&
          nia03h_content.replace('mailto:', '').match(nia03h_regexmail)
        ) {
          // OK
        }
        // Si tel ou fax verifiation de la regex tel
        else if (
          nia03h_content.indexOf('tel:') == 0 &&
          nia03h_content.replace('tel:', '').match(nia03h_regexphone)
        ) {
          // OK
        } else if (
          nia03h_content.indexOf('fax:') == 0 &&
          nia03h_content.replace('fax:', '').match(nia03h_regexphone)
        ) {
          // OK
        } else {
          setItemOutline(nia03h_nodes[i], 'red', 'nia03h', '03-H');
          nia03h_flag = true;
        }
      }
    }
  }
  if (nia03h_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03h' class='result-focus label-red'>03-H</a> : Présence de liens tel:, fax: ou mailto: non valide </li>"
    );
  }

  // I Lien sur "ici" ou sur "lien"
  if (!only_error) {
    const nia03i_nodes = document.querySelectorAll('html[lang="fr"] a');
    let nia03i_content = '';
    let nia03i_flag = false;
    if (nia03i_nodes && nia03i_nodes.length > 0) {
      for (let i = 0; i < nia03i_nodes.length; i++) {
        if (isItemVisible(nia03i_nodes[i])) {
          nia03i_content = nia03i_nodes[i].innerHTML;
          if (
            nia03i_content == 'ici' ||
            nia03i_content == 'cliquer ici' ||
            nia03i_content == 'cliquez ici' ||
            nia03i_content == 'lire la suite' ||
            nia03i_content == 'lien'
          ) {
            setItemOutline(nia03i_nodes[i], 'yellow', 'nia03i', '03-I');
            nia03i_flag = true;
          }
        }
      }
    }
    if (nia03i_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03i' class='result-focus label-yellow'>03-I</a> : Présence de liens non pertinent [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'> Opquast 132</a>]</li>"
      );
    }
  }

  // J Vérifie la présence de l'attribut target_blank sur les liens externe (Exception : On ne regarde pas dans les flux sociaux car le contenu provient d'un aggregateur)
  if (!only_redactor) {
    const nia03j_nodes = document.querySelectorAll(
      'a[href^="http"]:not([href*="' + url + '"]):not([target="_blank"])'
    );
    let nia03j_flag = false;
    if (
      nia03j_nodes &&
      nia03j_nodes.length > 0 &&
      isItemsVisible(nia03j_nodes)
    ) {
      for (let i = 0; i < nia03j_nodes.length; i++) {
        if (
          isItemVisible(nia03j_nodes[i]) &&
          nia03j_nodes[i].closest('.feed-wrapper') == null
        ) {
          setItemOutline(nia03j_nodes[i], 'orange', 'nia03j', '03-J');
          nia03j_flag = true;
        }
      }
    }
    if (nia03j_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03i' class='result-focus label-orange'>03-J</a> : Présence de liens externes qui s'ouvrent dans la fenêtre courante</li>"
      );
    }
  }

  //K Liens Pour en savoir plus
  if (!only_error && isAEM) {
    const nia03k_nodes = document.querySelectorAll(
      '.cmp-focus .focus-more.btn, .cmp-contentbox a.btn'
    );
    if (
      nia03k_nodes &&
      nia03k_nodes.length > 15 &&
      isItemsVisible(nia03k_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03k' class='result-focus label-yellow'>03-K</a> : Trop de liens Pour en savoir plus (" +
          nia03k_nodes.length +
          ')</li>'
      );
      setItemsOutline(nia03k_nodes, 'yellow', 'nia03k', '03-K');
    }
  }

  // L Présence de soulignement en dehors de lien
  if (!only_error) {
    const nia03l_nodes = document.querySelectorAll(
      'body *:not(a):not(mark):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(button)'
    );
    let nia03l_flag = false;
    if (
      nia03l_nodes &&
      nia03l_nodes.length > 0 &&
      isItemsVisible(nia03l_nodes)
    ) {
      for (let i = 0; i < nia03l_nodes.length; i++) {
        if (
          isItemVisible(nia03l_nodes[i]) &&
          window.getComputedStyle(nia03l_nodes[i], null).textDecorationLine ==
            'underline'
        ) {
          setItemOutline(nia03l_nodes[i], 'yellow', 'nia03l', '03-L');
          nia03l_flag = true;
        }
      }
    }
    if (nia03l_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03l' class='result-focus label-yellow'>03-L</a> : Réservez le soulignement aux liens</li>"
      );
    }
  }

  // M. Présence de liens avec un espace dans le href
  const nia03m_nodes = document.querySelectorAll(
    'a[href*=" "],[role="link"][href*=" "]'
  );
  if (nia03m_nodes && nia03m_nodes.length > 0 && isItemsVisible(nia03m_nodes)) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia03m' class='result-focus label-orange'>03-M</a> : Présence d'un lien erroné (espace present dans l'attribut href)</li>"
    );
    setItemsOutline(nia03m_nodes, 'orange', 'nia03m', '03-M');
  }

  // N. Un lien non_souligné et inclus dans un paragraphe de texte doit être suffisamment contrasté avec le texte environnant (à l’état par défaut, hover et focus). Idéalement, toujours souligner les liens.
  if (!only_redactor && !only_error) {
    const nia03n_nodes = document.querySelectorAll(
      'main *:not(li.nav-item) > p > a:not(.btn), main *:not(.cmp-autocompleteSearch__keywords) > li:not(.cmp-focus-list-item):not(.nav-item):not(.cmp-languagenavigation__item):not(.cmp-breadcrumb__item):not(.subnav-item):not(.cmp-grid__item ):not(.filter-item):not(.cmp-list__item) > a:not(.toc-anchor)'
    );
    let nia03n_flag = false;
    if (
      nia03n_nodes &&
      nia03n_nodes.length > 0 &&
      isItemsVisible(nia03n_nodes)
    ) {
      for (let i = 0; i < nia03n_nodes.length; i++) {
        if (
          isItemVisible(nia03n_nodes[i]) &&
          window.getComputedStyle(nia03n_nodes[i], null).textDecorationLine !=
            'underline'
        ) {
          setItemOutline(nia03n_nodes[i], 'yellow', 'nia03n', '03-N');
          nia03n_flag = true;
        }
      }
    }
    if (nia03n_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia03n' class='result-focus label-yellow'>03-N</a> : Présence d'un lien non souligné, vérifier son contraste avec le texte environnant</li>"
      );
    }
  }
}

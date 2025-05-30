/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-07 AEM Component 
- vérifie les points concernant la configuration des composants AEM suivant :  Intitulé de bouton menu,  Breadcrumb, Tooltip, Menu langue, Recherche, Vidéo, Menu
*/
function check_part_07() {
  if (debug_flag) console.log('07 AEM Component');

  // A. Position de bouton menu
  if (!only_redactor && isAEM) {
    const nia07a_nodes = document.querySelectorAll(
      'button.anchor[data-destination^="#headernav"]:not(.anchor-close)'
    );
    let nia07a_flag = false;
    if (nia07a_nodes && nia07a_nodes.length > 0) {
      for (let i = 0; i < nia07a_nodes.length; i++) {
        if (nia07a_nodes[i].closest('nav') == null) {
          setItemOutline(nia07a_nodes[i], 'red', 'nia07a', '07-A');
          nia07a_flag = true;
        }
      }
    }
    if (nia07a_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07a' class='result-focus label-red'>07-A</a> : Présence du bouton d'ouverture du menu en dehors de la balise nav</li>"
      );
    }
  }

  // B. Recherche

  // Presence de l'aria label
  const nia07b1_nodes = document.querySelectorAll(
    'role[search]:not([aria-label])'
  );
  if (
    nia07b1_nodes &&
    nia07b1_nodes.length > 0 &&
    isItemsVisible(nia07b1_nodes)
  ) {
    setItemToResultList(
      'dev',
      "<li><a href='#' data-destination='nia07b1' class='result-focus label-orange'>07-B</a> : Aria-label absent de la recherche</li>"
    );
    setItemsOutline(nia07b1_nodes, 'orange', 'nia07b1', '07-B');
  }

  // Placeholder différent du titre
  const nia07b2_nodes = document.querySelectorAll('input[type="search"]');
  let nia07b2_flag = false;
  if (
    nia07b2_nodes &&
    nia07b2_nodes.length > 0 &&
    isItemsVisible(nia07b2_nodes)
  ) {
    for (let i = 0; i < nia07b2_nodes.length; i++) {
      if (
        nia07b2_nodes[i].hasAttribute('placeholder') &&
        nia07b2_nodes[i].hasAttribute('title') &&
        nia07b2_nodes[i].getAttribute('placeholder') !=
          nia07b2_nodes[i].getAttribute('title')
      ) {
        nia07b2_flag = true;
        setItemOutline(nia07b2_nodes[i], 'red', 'nia07b2', '07-B');
      }
    }
  }
  if (nia07b2_flag == true) {
    setItemToResultList(
      'dev',
      "<li><a href='#' data-destination='nia07b2' class='result-focus label-red'>07-B</a> : Problème avec le placeholder de la recherche</li>"
    );
  }

  // Titre de recherche trop court
  const nia07b3_nodes = document.querySelectorAll('input[type="search"]');
  let nia07b3_flag = false;
  if (
    nia07b3_nodes &&
    nia07b3_nodes.length > 0 &&
    isItemsVisible(nia07b3_nodes)
  ) {
    for (let i = 0; i < nia07b3_nodes.length; i++) {
      if (
        nia07b3_nodes[i].hasAttribute('title') &&
        nia07b3_nodes[i].getAttribute('title').length < 15
      ) {
        nia07b3_flag = true;
        setItemOutline(nia07b3_nodes[i], 'orange', 'nia07b3', '07-B');
      }
    }
  }
  if (nia07b3_flag == true) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia07b3' class='result-focus label-orange'>07-B</a> : Problème avec la pertinence du titre de la recherche</li>"
    );
  }

  // Role search sur les recherches secondaires
  if (!only_redactor && !only_error && isAEM) {
    const nia07b4_nodes = document.querySelectorAll(
      'main form[role="search"]:not([action$="recherche.html"]):not([aria-label="Globale"]):not([aria-label="Global"])'
    );
    if (
      nia07b4_nodes &&
      nia07b4_nodes.length > 0 &&
      isItemsVisible(nia07b4_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b4' class='result-focus label-yellow'>07-B</a> : Présence d'un role=search sur les éléments de recherche secondaire</li>"
      );
      setItemsOutline(nia07b4_nodes, 'yellow', 'nia07b4', '07-B');
    }
  }

  // Les filtres sont présentés avec une structure en accordéon details/summary
  if (!only_redactor && !only_error && isAEM) {
    const nia07b5_nodes = document.querySelectorAll(
      '.filters-content > *:not(details)'
    );
    if (
      nia07b5_nodes &&
      nia07b5_nodes.length > 0 &&
      isItemsVisible(nia07b5_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b5' class='result-focus label-yellow'>07-B</a> : Il est recommander de présenter les filtres avec une structure en accordéon details/summary</li>"
      );
      setItemsOutline(nia07b5_nodes, 'yellow', 'nia07b5', '07-B');
    }
  }

  //Affichage du nombre de résultat
  if (!only_redactor && isAEM) {
    const nia07b6_nodes = document.querySelectorAll('.search-meta-count');
    if (
      nia07b6_nodes &&
      nia07b6_nodes.length > 0 &&
      !isItemsVisible(nia07b6_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b6' class='result-focus label-orange'>07-B</a> : Absence du nombre de resultat de la recherche</li>"
      );
      setItemsOutline(nia07b6_nodes, 'orange', 'nia07b6', '07-B');
    }
  }

  // Les résultats sont présentés sous forme d’une suite de balise <article> ou <li>
  if (!only_redactor && !only_error && isAEM) {
    const nia07b7_nodes = document.querySelectorAll(
      '.search-results .search-result > *:not(article):not(li)'
    );
    if (
      nia07b7_nodes &&
      nia07b7_nodes.length > 0 &&
      isItemsVisible(nia07b7_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b7' class='result-focus label-yellow'>07-B</a> : Les résultats doivent être présentés sous forme d’une suite de balise 'article' ou 'li'</li>"
      );
      setItemsOutline(nia07b7_nodes, 'yellow', 'nia07b7', '07-B');
    }
  }

  // La pagination doit être structurée dans un élément <nav role=‘navigation’> avec un aria_label
  if (!only_redactor) {
    const nia07b8_nodes = document.querySelectorAll(
      'nav:not([role="navigation"]) > :is(ol,ul).pagination, *:not(nav) > :is(ol,ul).pagination, nav:not([aria-label]) > :is(ol,ul).pagination'
    );
    if (
      nia07b8_nodes &&
      nia07b8_nodes.length > 0 &&
      isItemsVisible(nia07b8_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b8' class='result-focus label-red'>07-B</a> : La pagination doit être structurée dans un élément 'nav'  avec le role=navigation et un aria_label</li>"
      );
      setItemsOutline(nia07b8_nodes, 'red', 'nia07b8', '07-B');
    }
  }

  //Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)
  if (!only_redactor) {
    const nia07b9_nodes = document.querySelectorAll(
      'nav > .pagination:not(ol,ul)'
    );
    if (
      nia07b9_nodes &&
      nia07b9_nodes.length > 0 &&
      isItemsVisible(nia07b9_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b9' class='result-focus label-red'>07-B</a> : Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)</li>"
      );
      setItemsOutline(nia07b9_nodes, 'red', 'nia07b9', '07-B');
    }
  }

  // La page active doit avoir un aria_current='page'
  if (!only_redactor && isAEM) {
    const nia07b10_nodes = document.querySelectorAll(
      '.pagination .pagination-page'
    );
    let nia07b10_flag = false;
    let nia07b11_counter = 0;
    if (
      nia07b10_nodes &&
      nia07b10_nodes.length > 0 &&
      isItemsVisible(nia07b10_nodes)
    ) {
      for (let i = 0; i < nia07b10_nodes.length; i++) {
        if (nia07b10_nodes[i].tagName != 'LI') {
          setItemsOutline(nia07b10_nodes, 'red', 'nia07b10', '07-B');
          nia07b10_flag = true;
        } else if (
          !nia07b10_nodes[i].firstElementChild ||
          (nia07b10_nodes[i].firstElementChild.tagName == 'A' &&
            (!nia07b10_nodes[i].firstElementChild.hasAttribute('aria-label') ||
              nia07b10_nodes[i].firstElementChild.getAttribute('aria-label')
                .length < 4))
        ) {
          setItemsOutline(nia07b10_nodes, 'red', 'nia07b10', '07-B');
          nia07b10_flag = true;
        }
        if (
          nia07b10_nodes[i].hasAttribute('aria-current') &&
          nia07b10_nodes[i].getAttribute('aria-current') == 'page'
        ) {
          nia07b11_counter++;
        }
      }

      if (nia07b10_flag == true) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07b10' class='result-focus label-red'>07-B</a> : Les item de la pagination doivent être dans une balise li et leur enfant posseder un aria-label pertinent</li>"
        );
      }
      if (nia07b11_counter == 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07b11' class='result-focus label-red'>07-B</a> : La page active de la pagination doit avoir un aria_current= ‘page’</li>"
        );
        setItemsOutline(nia07b10_nodes, 'red', 'nia07b11', '07-B');
      }
    }
  }

  // C. Tooltip
  if (isAEM) {
    const nia07c_nodes = document.querySelectorAll('.search-view');
    if (
      nia07c_nodes &&
      nia07c_nodes.length > 0 &&
      isItemsVisible(nia07c_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia07c' class='result-focus label-red'>07-C</a> : Présence de tooltip non accessible sur les résultats de recherches [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-13-1' target='_blank'>RAWeb 10.13.1</a>]</li>"
      );
      setItemsOutline(nia07c_nodes, 'red', 'nia07c', '07-C');
    }
  }

  // D. Menu langue

  if (!only_redactor && isAEM) {
    const nia07d1_nodes = document.querySelectorAll(
      'nav[id^="language-"]:not([aria-label]), div > ul.cmp-languagenavigation__group:not([aria-label])'
    );
    if (
      nia07d1_nodes &&
      nia07d1_nodes.length > 0 &&
      isItemsVisible(nia07d1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia07d1' class='result-focus label-red'>07-D</a> : Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)</li>"
      );
      setItemsOutline(nia07d1_nodes, 'red', 'nia07d1', '07-D');
    }

    // Check vieux composant switch lang
    const nia07d2_nodes = document.querySelectorAll(
      '#page-langs ul[role="menu"] > li[role="none"]'
    );
    if (nia07d2_nodes && nia07d2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07d2' class='result-focus label-orange'>07-D</a> : Faiblesse de la structure du menu de switch des langues : ne pas utiliser role=menu</li>"
      );
      setItemsOutline(nia07d2_nodes, 'orange', 'nia07d2', '07-D');
    }

    // Les liens vers les versions linguistique doivent avoir l’attribut lang et posséder le title et le contenu textuel « de – Deutsch »
    const nia07d3_nodes = document.querySelectorAll(
      '.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([title*=" - "]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([lang]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([hreflang])'
    );
    if (
      nia07d3_nodes &&
      nia07d3_nodes.length > 0 &&
      isItemsVisible(nia07d3_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07d3' class='result-focus label-orange'>07-D</a> : Les liens vers les versions linguistique doivent avoir les attributs lang, hreflang et posséder un attribut title dont le contenu textuel est tel que : « de – Deutsch » </li>"
      );
      setItemsOutline(nia07d3_nodes, 'orange', 'nia07d3', '07-D');
    }
  }

  // E. Video player
  if (!only_redactor && isAEM) {
    const nia07e_nodes = document.querySelectorAll(
      '.cmp-multiplayer .player_img img[alt="Lire la vidéo Youtube, voir légende ci-après"][lang]:not([lang="fr"])'
    );
    if (
      nia07e_nodes &&
      nia07e_nodes.length > 0 &&
      isItemsVisible(nia07e_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07e' class='result-focus label-orange'>07-E</a> : Traduction manquante dans le composant Multimedia Player</li>"
      );
      setItemsOutline(nia07e_nodes, 'orange', 'nia07e', '07-E');
    }
  }

  // F. Menu

  // F1. Check si le menu existe
  if (!only_redactor && isAEM) {
    const nia07f_menu = document.querySelector(
      'nav.topnav > .page-headernav .navigation-container > ul.nav ,nav.page-headernav .navigation-container > ul.nav, nav.page-headernav-desk .navigation-container > ul.nav, nav.headernav-detached .navigation-container > ul.nav, .page-headernav > nav .navigation-container > ul.nav'
    );
    let nia07f_hasPasserelle = false;
    let nia07f_isModal = false;
    if (nia07f_menu) {
      const nia07f07_node = document.querySelector(
        'nav#headernav:not([role="navigation"])'
      );
      if (nia07f07_node && isItemVisible(nia07f07_node)) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07f07' class='result-focus label-orange'>07-F</a> : Role navigation absent de la barre de navigation</li>"
        );
        setItemsOutline(nia07f07_node, 'orange', 'nia07f07', '07-F');
      }
      if (!only_error) {
        const nia07f02_node = document.querySelector(
          'nav#headernav:not([aria-label]):not([aria-labelledby])'
        );
        if (nia07f02_node && isItemVisible(nia07f02_node)) {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f02' class='result-focus label-yellow'>07-F</a> : Attribut Aria-label absent de la barre de navigation</li>"
          );
          setItemsOutline(nia07f02_node, 'yellow', 'nia07f02', '07-F');
        }
      }

      // Check si un acces aux pages passerelles est disponible depuis la navigation
      const nia07f03_node = nia07f_menu.querySelector(
        ':scope > li.has-subnav > a'
      );
      if (nia07f03_node) {
        nia07f_hasPasserelle = true;
        if (debug_flag) console.log(' - Le menu utilise des pages passerelles');
      } else {
        if (debug_flag)
          console.log(" - Le menu n'utilise pas de pages passerelles");
      }

      // Itération sur les items du menu
      const nia07f10_nodes = nia07f_menu.querySelectorAll(':scope > li');
      let nia07f_list21 = '',
        nia07f_list22 = '',
        nia07f_list23 = '',
        nia07f_list24 = '',
        nia07f_list31 = '',
        nia07f_list32 = '',
        nia07f_list33 = '',
        nia07f_list34 = '',
        nia07f_list41 = '',
        nia07f_list42 = '',
        nia07f_list43 = '',
        nia07f_list44 = '';
      if (nia07f10_nodes && nia07f10_nodes.length > 0) {
        for (let i = 0; i < nia07f10_nodes.length; i++) {
          if (isItemVisible(nia07f10_nodes[i])) {
            let nia07f11_nodes = nia07f10_nodes[i].querySelectorAll(
              ':scope > a, :scope > .quick-navigation > a'
            );
            let nia07f12_nodes = nia07f10_nodes[i].querySelectorAll(
              ':scope > button, :scope > .disclosure--container > button'
            );
            let nia07f13_nodes = nia07f10_nodes[i].querySelectorAll(
              ':scope > ul, :scope > .disclosure--container > ul'
            );
            let iplusun = i + 1;
            if (nia07f10_nodes[i].classList.contains('has-subnav')) {
              // F2. Avec accès aux pages passerelles depuis la navigation:
              // Sur l'item de rubrique vérifier existance de (li.has-subnav > a) et de (li.has-subnav > button) + le button doit avoir l'attribut aria-expanded
              if (nia07f_hasPasserelle) {
                if (!nia07f11_nodes || nia07f11_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F2.1 Absence de lien pour se rendre à la page passerelle pour l'élément de menu n°" +
                        iplusun
                    );
                  nia07f_list21 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f21',
                    '07-F'
                  );
                } else if (!nia07f12_nodes || nia07f12_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F2.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°" +
                        iplusun
                    );
                  nia07f_list22 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f22',
                    '07-F'
                  );
                } else if (!nia07f13_nodes || nia07f13_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F2.3 Un problème a été detecté pour l'élement de menu n°" +
                        iplusun +
                        ' (absence de sous-menu alors que la classe has-subnav est présente)'
                    );
                  nia07f_list23 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f23',
                    '07-F'
                  );
                } else if (
                  nia07f12_nodes &&
                  !nia07f12_nodes[0].hasAttribute('aria-expanded')
                ) {
                  if (debug_flag)
                    console.log(
                      " - F2.4 Un problème a été detecté pour l'élement de menu n°" +
                        iplusun +
                        " (absence de l'attribut aria-expanded)"
                    );
                  nia07f_list24 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f24',
                    '07-F'
                  );
                } else {
                  if (debug_flag)
                    console.log(
                      " - L'item de menu " +
                        iplusun +
                        ' avec page passerelles et sous-menu est OK'
                    );
                }
              }

              // F3. Sans l’accès aux pages passerelles depuis la navigation:
              // Sur l'item de rubrique vérifier existance de (li.has-subnav > button) + cette item doit avoir l'attribut aria-expanded
              else {
                if (nia07f11_nodes && nia07f11_nodes.length > 0) {
                  if (debug_flag)
                    console.log(
                      " - F3.1 Présence d'un lien pour se rendre à une page passerelle sur l'élement de menu n°" +
                        iplusun
                    );
                  nia07f_list31 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f31',
                    '07-F'
                  );
                } else if (!nia07f12_nodes || nia07f12_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F3.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°" +
                        iplusun
                    );
                  nia07f_list32 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f32',
                    '07-F'
                  );
                } else if (!nia07f13_nodes || nia07f13_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F3.3 Un problème a été detecté pour l'élement de menu n°" +
                        iplusun +
                        ' (absence de sous-menu alors que la classe has-subnav est présente)'
                    );
                  nia07f_list33 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f33',
                    '07-F'
                  );
                } else if (
                  nia07f12_nodes &&
                  !nia07f12_nodes[0].hasAttribute('aria-expanded')
                ) {
                  if (debug_flag)
                    console.log(
                      " - F3.4 Un problème a été detecté pour l'élement de menu n°" +
                        iplusun +
                        " (absence de l'attribut aria-expanded)"
                    );
                  nia07f_list34 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f34',
                    '07-F'
                  );
                } else {
                  if (debug_flag)
                    console.log(
                      " - L'item de menu " +
                        iplusun +
                        ' sans page passerelles et sous-menu est OK'
                    );
                }
              }
            } else {
              // F4 Vérifier que les élements (li:not(.has-subnav) > a) n'ont pas d'attribut aria-expanded ni aria-haspopup ni est suivi d'un élément ul
              if (!nia07f11_nodes || nia07f11_nodes.length != 1) {
                if (debug_flag)
                  console.log(
                    " - F4.1 Un problème a été detecté pour l'élement de menu n°" +
                      iplusun
                  );
                nia07f_list41 += iplusun + ',';
                setItemOutline(nia07f10_nodes[i], 'orange', 'nia07f41', '07-F');
              } else if (nia07f12_nodes && nia07f12_nodes.length > 0) {
                if (debug_flag)
                  console.log(
                    " - F4.2 Un problème a été detecté pour l'élement de menu n°" +
                      iplusun
                  );
                nia07f_list42 += iplusun + ',';
                setItemOutline(nia07f10_nodes[i], 'orange', 'nia07f42', '07-F');
              } else if (nia07f13_nodes && nia07f13_nodes.length > 0) {
                if (debug_flag)
                  console.log(
                    " - F4.3 Un problème a été detecté pour l'élement de menu n°" +
                      iplusun
                  );
                nia07f_list43 += iplusun + ',';
                setItemOutline(nia07f10_nodes[i], 'orange', 'nia07f43', '07-F');
              } else if (
                nia07f11_nodes &&
                (nia07f11_nodes[0].hasAttribute('aria-expanded') ||
                  nia07f11_nodes[0].hasAttribute('aria-haspopup'))
              ) {
                if (debug_flag)
                  console.log(
                    " - F4.4 Un problème a été detecté pour l'élement de menu n°" +
                      iplusun
                  );
                nia07f_list44 += iplusun + ',';
                setItemOutline(nia07f10_nodes[i], 'orange', 'nia07f44', '07-F');
              } else {
                if (debug_flag)
                  console.log(
                    " - L'item de menu " + iplusun + ' sans sous-menu est OK'
                  );
              }
            }
          }
        }

        if (nia07f_list21 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f21' class='result-focus label-orange'>07-F</a> Absence de lien pour se rendre à la page passerelle <span class='cy-hidden'>pour l'élément de menu n°" +
              nia07f_list21.slice(0, -1) +
              '</span></li>'
          );
        }
        if (nia07f_list22 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f22' class='result-focus label-orange'>07-F</a> : Absence de bouton pour déplier le sous-menu<span class='cy-hidden'> pour l'élement de menu n°" +
              nia07f_list22.slice(0, -1) +
              '</span></li>'
          );
        }
        if (nia07f_list23 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f23' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list23.slice(0, -1) +
              '</span>: absence de sous-menu alors que la classe has-subnav est présente</li>'
          );
        }
        if (nia07f_list24 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f24' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list24.slice(0, -1) +
              "</span>: absence de l'attribut aria-expanded</li>"
          );
        }
        if (nia07f_list31 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f31' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list31.slice(0, -1) +
              '</span>: conflit sur le lien pour aller sur la page passerelle</li>'
          );
        }
        if (nia07f_list32 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f32' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list32.slice(0, -1) +
              '</span>: absence de bouton pour déplier le sous-menu</li>'
          );
        }
        if (nia07f_list33 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f33' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list33.slice(0, -1) +
              '</span>: absence de sous-menu alors que la classe has-subnav est présente)</li>'
          );
        }
        if (nia07f_list34 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f34' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list34.slice(0, -1) +
              "</span>: absence de l'attribut aria-expanded</li>"
          );
        }
        if (nia07f_list41 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f41' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list41.slice(0, -1) +
              '</span>: absence de lien pour acceder aux pages passerelle.</li>'
          );
        }
        if (nia07f_list42 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f42' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list42.slice(0, -1) +
              '</span>: remplacer les boutons par des liens de navigation</li>'
          );
        }
        if (nia07f_list43 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f43' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list43.slice(0, -1) +
              '</span>: un item du menu sans sous-menu contient une liste ul</li>'
          );
        }
        if (nia07f_list44 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f44' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list44.slice(0, -1) +
              "</span>: présence d'attributs aria-expanded ou aria-haspopup sur un item du menu</li>"
          );
        }
      }

      // On resize pour voir le menu (Attention certain attributs sont ajouté en JS)
      // window.resizeTo(320, 500);
      // document.body.style.zoom = "400%";

      // Check si le menu mobile s'ouvre en disclosure ou en modale
      const nia07f20_btn = document.querySelector(
        '.topnav > button.anchor.anchor-scroll, .page-headernav > button.anchor.anchor-scroll, .page-headernavmobile > button.anchor.anchor-scroll'
      );
      const nia07f21_btnClose = document.querySelector(
        '[aria-modal="true"] button.anchor.anchor-close'
      );
      if (
        nia07f20_btn &&
        (isItemVisible(nia07f20_btn) ||
          (nia07f21_btnClose && isItemVisible(nia07f21_btnClose)))
      ) {
        const nia07f20_btnText = nia07f20_btn.innerText;
        const nia07f20_btnDest = nia07f20_btn.getAttribute('data-destination');
        const nia07f30_Dest = document.querySelector(nia07f20_btnDest);

        if (!nia07f20_btn.hasAttribute('aria-expanded')) {
          nia07f_isModal = true;
          if (debug_flag)
            console.log(" - Le menu mobile s'ouvre dans une modale");
          if (!nia07f20_btn.hasAttribute('aria-haspopup') && !only_error) {
            if (debug_flag)
              console.log(
                " - F5.1 : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f51' class='result-focus label-yellow'>07-F</a> : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu</li>"
            );
            setItemOutline(nia07f20_btn, 'yellow', 'nia07f51', '07-F');
          }
        } else {
          if (debug_flag)
            console.log(" - Le menu mobile s'ouvre dans un disclosure");

          if (nia07f20_btn.getAttribute('aria-expanded') == true) {
            if (debug_flag)
              console.log(
                " - F5.2 : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f52' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu</li>"
            );
            setItemOutline(nia07f20_btn, 'red', 'nia07f52', '07-F');
          }

          if (
            Boolean(nia07f30_Dest.closest('[role="dialog"]')) ||
            Boolean(nia07f30_Dest.closest('[aria-modal="true"]'))
          ) {
            if (debug_flag)
              console.log(
                " - F5.3 : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f53' class='result-focus label-red'>07-F</a> : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f53', '07-F');
          }

          if (nia07f20_btn.hasAttribute('aria-haspopup')) {
            if (debug_flag)
              console.log(
                " - F5.4 : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f54' class='result-focus label-red'>07-F</a> : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu</li>"
            );
            setItemOutline(nia07f20_btn, 'red', 'nia07f54', '07-F');
          }
        }
        if (
          nia07f30_Dest.hasAttribute('aria-hidden') &&
          nia07f30_Dest.getAttribute('aria-hidden') == false
        ) {
          if (debug_flag)
            console.log(' - F5.5 : Vocalisation du menu caché en mobile');
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f55' class='result-focus label-red'>07-F</a> : Vocalisation du menu caché en mobile</li>"
          );
          setItemOutline(nia07f30_Dest, 'red', 'nia07f55', '07-F');
        }

        // On click sur le bouton pour ouvrir le menu (s'il n'est pas déjà ouvert)
        if (!isItemVisible(nia07f30_Dest)) nia07f20_btn.click();

        const lang = nia07f20_btn.closest('[lang]').getAttribute('lang');

        if (
          sanitizeText(nia07f20_btn.innerText, lang) !=
          sanitizeText(nia07f20_btnText, lang)
        ) {
          if (debug_flag)
            console.log(
              " - F6.1 Attention le texte du bouton d'ouverture du menu à changé cela ne devrai pas être le cas"
            );
          if (debug_flag) console.log(nia07f20_btn.innerText);
          if (debug_flag) console.log(nia07f20_btnText);
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f61' class='result-focus label-red'>07-F</a> : Attention le texte du bouton d'ouverture du menu change à l'ouverture du menu cela ne devrai pas être le cas</li>"
          );
          setItemOutline(nia07f20_btn, 'red', 'nia07f61', '07-F');
        }

        if (nia07f_isModal) {
          // une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" aria-modal="true" role="dialog" aria-label="Menu principal"
          if (
            nia07f30_Dest.hasAttribute('aria-hidden') &&
            nia07f30_Dest.getAttribute('aria-hidden') != 'false'
          ) {
            if (debug_flag)
              console.log(
                " - F6.2 Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert"
              );
            if (debug_flag)
              console.log(nia07f30_Dest.getAttribute('aria-hidden'));
            if (debug_flag)
              console.log(nia07f30_Dest.getAttribute('aria-hidden') != 'false');
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f62' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f62', '07-F');
          }

          if (
            !nia07f30_Dest.hasAttribute('aria-modal') ||
            nia07f30_Dest.getAttribute('aria-modal') != 'true'
          ) {
            if (debug_flag)
              console.log(
                " - F6.3 Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert"
              );
            if (debug_flag)
              console.log(!nia07f30_Dest.hasAttribute('aria-modal'));
            if (debug_flag)
              console.log(nia07f30_Dest.getAttribute('aria-modal') != 'true');
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f63' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f63', '07-F');
          }

          if (
            !nia07f30_Dest.hasAttribute('role') ||
            nia07f30_Dest.getAttribute('role') != 'dialog'
          ) {
            if (debug_flag)
              console.log(
                " - F6.4 Erreur dans la valeur de l'attribut role du menu modal ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f64' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut role du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f64', '07-F');
          }

          if (
            !(
              nia07f30_Dest.hasAttribute('aria-label') ||
              nia07f30_Dest.hasAttribute('aria-labelledby')
            )
          ) {
            if (debug_flag)
              console.log(
                " - F6.5 Erreur dans la valeur de l'attribut aria-label du menu modal ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f65' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-label du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f65', '07-F');
          }
          // le premier élément de cette modale est un button.anchor-close
          if (
            nia07f30_Dest.firstChild.tagName == 'BUTTON' &&
            nia07f30_Dest.firstChild.className.contains('anchor-close')
          ) {
            if (debug_flag)
              console.log(
                ' - F6.6 Erreur au niveau du bouton close du menu modal ouvert'
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f66' class='result-focus label-red'>07-F</a> : Erreur au niveau du bouton close du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f66', '07-F');
          }
        } else {
          // une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" - Absence de aria-modal="true" role="dialog"
          if (
            nia07f30_Dest.hasAttribute('aria-hidden') &&
            nia07f30_Dest.getAttribute('aria-hidden') != false
          ) {
            if (debug_flag)
              console.log(
                " - F6.7 Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f67' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f67', '07-F');
          }

          if (
            nia07f30_Dest.hasAttribute('aria-modal') &&
            nia07f30_Dest.getAttribute('aria-modal') == true
          ) {
            if (debug_flag)
              console.log(
                " - F6.8 Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f68' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f68', '07-F');
          }

          if (
            nia07f30_Dest.hasAttribute('role') &&
            nia07f30_Dest.getAttribute('role') == 'dialog'
          ) {
            if (debug_flag)
              console.log(
                " - F6.9 Erreur dans la valeur de l'attribut role du menu disclosure ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f69' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut role du menu disclosure ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f69', '07-F');
          }
        }
        // On ferme le menu
        if (isItemVisible(nia07f20_btn)) {
          nia07f20_btn.click();
        } else if (nia07f21_btnClose && isItemVisible(nia07f21_btnClose)) {
          nia07f21_btnClose.click();
        }
      }
      //window.resizeTo(currentWidth, currentHeight);

      // G Structure globale du menu

      const nia07g1_nodes = document.querySelectorAll(
        'nav#headernav .nav--primary:not(ul), nav#headernav ul.nav--primary > .nav-item:not(li), nav#headernav ul.nav--primary > li.nav-item.has-subnav .subnav-item:not(li)'
      );
      if (nia07g1_nodes && nia07g1_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07g1' class='result-focus label-red'>07-G</a> : Les items du menu et du sous menu sont sous forme de liste ul/li</li>"
        );
        setItemsOutline(nia07g1_nodes, 'red', 'nia07g1', '07-G');
      }

      const nia07g2_nodes = document.querySelectorAll(
        'nav#headernav :is(a,button)'
      );
      let nia07g2_flag = false;
      if (nia07g2_nodes && nia07g2_nodes.length > 0) {
        for (let i = 0; i < nia07g2_nodes.length; i++) {
          if (
            !nia07g2_nodes[i].textContent ||
            nia07g2_nodes[i].textContent == ''
          ) {
            nia07g2_flag = true;
            setItemsOutline(nia07g2_nodes, 'red', 'nia07g2', '07-G');
          }
        }
      }
      if (nia07g2_flag == true) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07g2' class='result-focus label-red'>07-G</a> : Les éléments du menu et des sous_menus doivent avoir un intitulé </li>"
        );
      }

      const nia07g3_nodes = document.querySelectorAll('nav#headernav li a');
      let nia07g3_items;
      let nia07g3_flag = false;
      let nia07g4_flag = false;
      let nia07g5_counter = 0;
      if (nia07g3_nodes && nia07g3_nodes.length > 0) {
        for (let i = 0; i < nia07g3_nodes.length; i++) {
          if (nia07g3_nodes[i].hasAttribute('aria-current')) {
            if (nia07g3_nodes[i].getAttribute('aria-current') == 'page') {
              nia07g5_counter++;
              if (
                nia07g3_nodes[i].parentElement.classList.contains('subnav-item')
              ) {
                if (
                  !nia07g3_nodes[i].parentElement.closest('has-subnav') ||
                  !nia07g3_nodes[i].parentElement
                    .closest('has-subnav')
                    .firstElementChild.hasAttribute('aria-current') ||
                  nia07g3_nodes[i].parentElement
                    .closest('has-subnav')
                    .firstElementChild.getAttribute('aria-current') != 'true'
                ) {
                  if (debug_flag == true) {
                    console.log(
                      !nia07g3_nodes[i].parentElement.closest('has-subnav')
                    );
                    console.log(
                      !nia07g3_nodes[i].parentElement
                        .closest('has-subnav')
                        .firstElementChild.hasAttribute('aria-current')
                    );
                    console.log(
                      nia07g3_nodes[i].parentElement
                        .closest('has-subnav')
                        .firstElementChild.getAttribute('aria-current') !=
                        'true'
                    );
                  }
                  nia07g3_flag = true;
                  setItemOutline(nia07g3_nodes[i], 'red', 'nia07g3', '07-G');
                }
              }
            } else if (
              nia07g3_nodes[i].getAttribute('aria-current') == 'true' &&
              nia07g3_nodes[i].parentElement.classList.contains('has-subnav')
            ) {
              nia07g3_items = nia07g3_nodes[i].parentElement.querySelectorAll(
                '.subnav-item > a[aria-current="page"], .subnav-item > a[aria-current="true"]'
              );
              console.log(nia07g3_items);
              if (!nia07g3_items || nia07g3_items.length != 1) {
                nia07g4_flag = true;
                setItemOutline(nia07g3_nodes[i], 'red', 'nia07g4', '07-G');
              }
            }
          }
        }
      }

      if (nia07g3_flag == true) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07g3' class='result-focus label-red'>07-G</a> : Les pages parentes de la page courante doivent avoir un attribut aria_current= 'true' </li>"
        );
      }
      if (nia07g4_flag == true) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07g4' class='result-focus label-red'>07-G</a> : Une des pages enfant d'un menu actif doit avoir un attribut aria_current= 'page' </li>"
        );
      }
      if (nia07g5_counter > 1) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07g5' class='result-focus label-red'>07-G</a> : Il ne peut y avoir qu'un seul élément dans le menu avec l'attribut aria-current=page </li>"
        );
        setItemOutline(
          nia07g3_nodes[0].parentElement,
          'red',
          'nia07g5',
          '07-G'
        );
      }
    } else if (!only_error) {
      setItemToResultList(
        'man',
        "<li><span class='result-focus label-yellow'>07-F</span> : Absence de barre de navigation</li>"
      );
    }
  }
}

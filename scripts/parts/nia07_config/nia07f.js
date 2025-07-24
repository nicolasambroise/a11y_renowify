// F. Menu
function check_test_07f() {

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
    }
  }
}
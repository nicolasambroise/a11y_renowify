// E. Utilisation des Skiplinks
function check_test_09e() {
  if (!only_redactor && isAEM) {
    const nia09e1_nodes = document.querySelector(
      'body > .skiplinks a[href="#main"], body > .xfpage > .skiplinks a[href="#main"]'
    );
    if (nia09e1_nodes == null) {
      setItemToResultList(
        'nc',
        "<li><span class='result-focus label-red'>09-E</span> : Absence de skiplinks pour aller à la zone de contenu principale [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-contient-des-liens-dacces-rapide-places-au-debut-du-code-source' target='_blank'>Opquast 159</a>]</li>"
      );
    }

    const nia09e2_nodes = document.querySelectorAll('.skiplinks a[href]');
    let nia09e2_flag = false;
    let nia09e2_dest = '';
    if (nia09e2_nodes && nia09e2_nodes.length > 0) {
      for (let i = 0; i < nia09e2_nodes.length; i++) {
        nia09e2_dest = document.querySelector(
          nia09e2_nodes[i].getAttribute('href')
        );
        if (nia09e2_dest == null) {
          if (debug_flag) console.log(nia09e2_nodes[i]);
          if (isItemDisplayNone(nia09e2_nodes[i])) {
            if (!only_error) {
              setItemToResultList(
                'man',
                "<li><span class='result-focus label-yellow'>09-E</span> : Un skiplinks non visible (display:none) n'a pas de destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]</li>"
              );
            }
          } else {
            nia09e2_flag = true;
          }
        }
      }
    }
    if (nia09e2_flag == true) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-red'>09-E</span> : Un skiplinks n'est pas correctement lié à sa destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]</li>"
      );
    }

    // Les skiplinks situé dans l’entête doivent être dans un élément <nav role=’navigation’> avec un aria_label
    if (!only_error) {
      const nia09e3_nodes = document.querySelector(
        'body > .skiplinks, body > .xfpage > .skiplinks'
      );
      if (
        nia09e3_nodes.firstElementChild &&
        (nia09e3_nodes.firstElementChild.nodeName != 'NAV' ||
          !nia09e3_nodes.firstElementChild.hasAttribute('aria-label') ||
          !nia09e3_nodes.firstElementChild.hasAttribute('role') ||
          nia09e3_nodes.firstElementChild.getAttribute('role') != 'navigation')
      ) {
        setItemToResultList(
          'nth',
          "<li><a href='#' data-destination='nia09e3' class='result-focus label-yellow'>09-E</a> : Les skiplinks doivent se trouver dans un element nav avec un aria-label et un role=navigation</li>"
        );
        setItemOutline(nia09e3_nodes, 'yellow', 'nia09e3', '09-E');
      }
    }

    // Les skiplinks situé dans l’entête doivent être les premiers éléments tabulable de la page (hors modale des cookies)
    if (!only_error) {
      const nia09e4_nodes = document.querySelectorAll(
        'body > *:not(#orejime):not(#a42-ac):not(.checkA11YSpan):not(link):not(svg.iconset)'
      );
      if (
        !nia09e4_nodes[0].classList.contains('skiplinks') &&
        !nia09e4_nodes[0].firstElementChild.classList.contains('skiplinks')
      ) {
        setItemToResultList(
          'nth',
          "<li><a href='#' data-destination='nia09e4' class='result-focus label-yellow'>09-E</a> : Les skiplinks situé dans l’entête doivent être les premiers éléments tabulable de la page (hors modale des cookies)</li>"
        );
        setItemOutline(nia09e4_nodes[0], 'yellow', 'nia09e4', '09-E');
      }
    }

    // S’il y a plusieurs Skiplinks, ils doivent être structurée sous forme de liste <ul>
    if (!only_error) {
      const nia09e5_nodes = document.querySelectorAll(
        'body > .skiplinks a[href]'
      );
      if (
        nia09e5_nodes &&
        nia09e5_nodes.length > 1 &&
        nia09e5_nodes[0].parentElement.nodeName != 'LI'
      ) {
        setItemToResultList(
          'nth',
          "<li><a href='#' data-destination='nia09e5' class='result-focus label-yellow'>09-E</a> : S’il y a plusieurs Skiplinks, ils doivent être structurée sous forme de liste 'ul'</li>"
        );
        setItemOutline(
          nia09e5_nodes[0].parentElement,
          'yellow',
          'nia09e5',
          '09-E'
        );
      }
    }
  }
}

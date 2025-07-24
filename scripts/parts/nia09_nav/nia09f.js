// F taille des éléments interactifs minimum attendue est de 24px par 24px.
function check_test_09f() {
  if (!only_redactor && !only_error) {
    const nia09f_nodes = document.querySelectorAll(
      '*:not(.cmp-text) > *:not(p) > a:not(.feed-item-timing):not(.cmp-breadcrumb__item-link):not(.geoportail-skip):not(.cmp-image__link), button, input:not([type="file"]), select, details, textarea, [tabindex="0"], [tabindex="-1"]'
    );
    let nia09f_flag = false;
    let nia09f_rect, nia09f_rect_parent;
    let nia09f_horizontal = 0,
      nia09f_vertical = 0;
    let nia09f_horizontal_parent = 0,
      nia09f_vertical_parent = 0;
    if (nia09f_nodes && nia09f_nodes.length > 0) {
      for (let i = 0; i < nia09f_nodes.length; i++) {
        if (isItemVisible(nia09f_nodes[i]) && !isItemSROnly(nia09f_nodes[i])) {
          nia09f_rect = nia09f_nodes[i].getBoundingClientRect();
          nia09f_horizontal =
            nia09f_rect['width'] +
            parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginLeft']) +
            parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginRight']);
          nia09f_vertical =
            nia09f_rect['height'] +
            parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginTop']) +
            parseFloat(
              window.getComputedStyle(nia09f_nodes[i])['marginBottom']
            );

          if (nia09f_rect['width'] != 0 && nia09f_rect['height'] != 0) {
            if (nia09f_horizontal < 24 || nia09f_vertical < 24) {
              if (
                nia09f_nodes[i].parentElement.tagName == 'LI' ||
                nia09f_nodes[i].parentElement.childElementCount == 1
              ) {
                nia09f_rect_parent =
                  nia09f_nodes[i].parentElement.getBoundingClientRect();
                nia09f_horizontal_parent =
                  nia09f_rect_parent['width'] +
                  parseFloat(
                    window.getComputedStyle(nia09f_nodes[i].parentElement)[
                      'marginLeft'
                      ]
                  ) +
                  parseFloat(
                    window.getComputedStyle(nia09f_nodes[i].parentElement)[
                      'marginRight'
                      ]
                  );
                nia09f_vertical_parent =
                  nia09f_rect_parent['height'] +
                  parseFloat(
                    window.getComputedStyle(nia09f_nodes[i].parentElement)[
                      'marginTop'
                      ]
                  ) +
                  parseFloat(
                    window.getComputedStyle(nia09f_nodes[i].parentElement)[
                      'marginBottom'
                      ]
                  );
                if (
                  nia09f_horizontal_parent < 24 ||
                  nia09f_vertical_parent < 24
                ) {
                  // console.log("09f1 : "+nia09f_horizontal+" "+nia09f_vertical);
                  // console.log("09f2 : "+nia09f_horizontal_parent+" "+nia09f_vertical_parent);

                  if (
                    nia09f_vertical_parent > 18 &&
                    nia09f_horizontal_parent > 50
                  ) {
                    // Exception In-line : Par exemple un lien dans un texte
                  } else {
                    if (debug_flag) console.log(nia09f_rect);
                    nia09f_flag = true;
                    setItemOutline(nia09f_nodes[i], 'yellow', 'nia09f', '09-F');
                  }
                }
              } else if (
                nia09f_nodes[i].parentElement.tagName != 'P' &&
                nia09f_nodes[i].parentElement.tagName != 'SPAN' &&
                nia09f_nodes[i].parentElement.tagName != 'SMALL' &&
                nia09f_nodes[i].parentElement.tagName != 'DD' &&
                nia09f_nodes[i].parentElement.tagName != 'STRONG'
              ) {
                if (debug_flag) console.log(nia09f_rect);
                nia09f_flag = true;
                setItemOutline(nia09f_nodes[i], 'yellow', 'nia09f', '09-F');
              } else if (nia09f_vertical > 18 && nia09f_horizontal > 50) {
                // Exception In-line : Par exemple un lien dans un texte
              } else {
                nia09f_flag = true;
                setItemOutline(nia09f_nodes[i], 'yellow', 'nia09f', '09-F');
              }
            }
          }
        }
      }
    }
    if (nia09f_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia09f' class='result-focus label-yellow'>09-F</a> : Taille d'éléments interactifs minimum attendue est de 24px par 24px (marges comprises) [<a href='https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' target='_blank'>WCAG 2.2 SC258</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-taille-des-elements-cliquables-est-suffisante' target='_blank'>Opquast 181</a>]</li>"
      );
    }
  }
}
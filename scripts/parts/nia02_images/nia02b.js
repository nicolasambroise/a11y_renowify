// B. Vérification des attributs des svg
function check_test_02b() {
  const nia02b1_nodes = document.querySelectorAll(
    'svg:not([aria-hidden="true"]):not(.iconset)'
  );
  const nia02b2_nodes = document.querySelectorAll(
    'svg:not([focusable="false"]):not(.iconset)'
  );
  if (
    nia02b1_nodes &&
    nia02b1_nodes.length > 0 &&
    isItemsVisible(nia02b1_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02b1' class='result-focus label-red'>02-B</a> : Absence de certains attributs sur des SVG (aria-hidden=true) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
    );
    setItemsOutline(nia02b1_nodes, 'red', 'nia02b1', '02-B');
  }
  if (!only_error) {
    if (
      nia02b2_nodes &&
      nia02b2_nodes.length > 0 &&
      isItemsVisible(nia02b2_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia02b2' class='result-focus label-yellow'>02-B</a> : Absence de certains attributs sur des SVG (focusable=false) [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
      );
      setItemsOutline(nia02b2_nodes, 'yellow', 'nia02b2', '02-B');
    }
  }

  const nia02b3_nodes = document.querySelectorAll(
    'svg[role="img"]:not([title]):not([aria-labelledby]):not([aria-label])'
  );
  if (
    nia02b3_nodes &&
    nia02b3_nodes.length > 0 &&
    isItemsVisible(nia02b3_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02b3' class='result-focus label-red'>02-B</a> : Les images vectorielle porteuse d'information doivent posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-5' target='_blank'>RAWeb 1.1.5</a>]</li>"
    );
    setItemsOutline(nia02b3_nodes, 'red', 'nia02b3', '02-B');
  }

  const nia02b4_nodes = document.querySelectorAll(
    'svg[aria-hidden="true"][aria-label], svg[aria-hidden="true"][aria-labelledby]'
  );
  if (
    nia02b4_nodes &&
    nia02b4_nodes.length > 0 &&
    isItemsVisible(nia02b4_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02b4' class='result-focus label-red'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
    );
    setItemsOutline(nia02b4_nodes, 'red', 'nia02b4', '02-B');
  }

  const nia02b5_nodes = document.querySelectorAll(
    'svg[aria-hidden="true"] title, svg[aria-hidden="true"] desc'
  );
  let nia02b5_flag = false;
  if (nia02b5_nodes && nia02b5_nodes.length > 0) {
    for (let i = 0; i < nia02b5_nodes.length; i++) {
      if (
        isItemsVisible(nia02b5_nodes[i]) &&
        ((nia02b5_nodes[i].hasAttribute('title') &&
            nia02b5_nodes[i].getAttribute('title').length > 0) ||
          (nia02b5_nodes[i].hasAttribute('desc') &&
            nia02b5_nodes[i].getAttribute('desc').length > 0))
      ) {
        setItemOutline(nia02b5_nodes[i], 'red', 'nia02b5', '02-B');
        nia02b5_flag = true;
      }
    }
  }
  if (nia02b5_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02b5' class='result-focus label-red'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle dans des balises 'title' ou 'desc' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a>]</li>"
    );
  }
}
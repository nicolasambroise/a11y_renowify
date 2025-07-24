// A. Présence d’un attribut alt sur toutes les images
function check_test_02a() {
  const nia02a1_nodes = document.querySelectorAll(
    '*:not(.ol-overlay-container) > *:not(.ol-overlay-container) >  img:not([alt]):not([aria-label]):not([aria-labelledby]):not([title]), [role="image"]:not([aria-label]):not([aria-labelledby])'
  );
  if (
    nia02a1_nodes &&
    nia02a1_nodes.length > 0 &&
    isItemsVisible(nia02a1_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02a1' class='result-focus label-red'>02-A</a> : Présence de " +
      nia02a1_nodes.length +
      " images sans alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
    );
    setItemsOutline(nia02a1_nodes, 'red', 'nia02a1', '02-A');
  }

  if (!only_error) {
    const nia02a2_nodes = document.querySelectorAll(
      '*:not(.ol-overlay-container) > *:not(.ol-overlay-container) > img:not([alt])'
    );
    if (
      nia02a2_nodes &&
      nia02a2_nodes.length > 0 &&
      isItemsVisible(nia02a2_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia02a2' class='result-focus label-yellow'>02-A</a> : Présence de " +
        nia02a2_nodes.length +
        " images sans attribut alt [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
      );
      setItemsOutline(nia02a2_nodes, 'yellow', 'nia02a2', '02-A');
    }
  }
}
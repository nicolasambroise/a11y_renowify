// F. Vérification sur les images atypique
function check_test_02f() {
  if (!only_redactor) {
    const nia02f1_nodes = document.querySelectorAll(
      'area:not([aria-label]):not([alt])'
    );
    if (
      nia02f1_nodes &&
      nia02f1_nodes.length > 0 &&
      isItemsVisible(nia02f1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f1' class='result-focus label-red'>02-F</a> : Les zones d'image réactive porteuse d'information doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-2' target='_blank'>RAWeb 1.1.2</a>]</li>"
      );
      setItemsOutline(nia02f1_nodes, 'red', 'nia02f1', '02-F');
    }

    const nia02f2_nodes = document.querySelectorAll(
      'input[type="image"]:not([alt]):not([aria-label]):not([aria-labelledby]):not([title])'
    );
    if (
      nia02f2_nodes &&
      nia02f2_nodes.length > 0 &&
      isItemsVisible(nia02f2_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f2' class='result-focus label-red'>02-F</a> : Les boutons de type image (balise input avec attribut type=image doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-3' target='_blank'>RAWeb 1.1.3</a>]</li>"
      );
      setItemsOutline(nia02f2_nodes, 'red', 'nia02f2', '02-F');
    }

    const nia02f3_nodes = document.querySelectorAll(
      'object[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])'
    );
    if (
      nia02f3_nodes &&
      nia02f3_nodes.length > 0 &&
      isItemsVisible(nia02f3_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f3' class='result-focus label-red'>02-F</a> : Les images objects porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-6' target='_blank'>RAWeb 1.1.6</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-porteuse-dinformation-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 113</a>]</li>"
      );
      setItemsOutline(nia02f3_nodes, 'red', 'nia02f3', '02-F');
    }

    const nia02f4_nodes = document.querySelectorAll(
      'embed[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])'
    );
    if (
      nia02f4_nodes &&
      nia02f4_nodes.length > 0 &&
      isItemsVisible(nia02f4_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f4' class='result-focus label-red'>02-F</a> : Les images embarquée porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-7' target='_blank'>RAWeb 1.1.7</a>]</li>"
      );
      setItemsOutline(nia02f4_nodes, 'red', 'nia02f4', '02-F');
    }

    const nia02f5_nodes = document.querySelectorAll(
      'canvas[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby])'
    );
    if (
      nia02f5_nodes &&
      nia02f5_nodes.length > 0 &&
      isItemsVisible(nia02f5_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f5' class='result-focus label-red'>02-F</a> : Les images bitmap (balise canvas) porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-8' target='_blank'>RAWeb 1.1.8</a>]</li>"
      );
      setItemsOutline(nia02f5_nodes, 'red', 'nia02f5', '02-F');
    }
  }
}
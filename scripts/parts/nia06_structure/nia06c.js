// C. Vérifier que la zone d’en-tête est structurée au moyen d’un élément <header> ;
function check_test_06c() {
  // <header class="page-header" role="banner">
  if (!only_redactor && !only_error) {
    const nia06c_nodes = document.querySelector('header:not([role="banner"])');
    if (nia06c_nodes != null && nia06c_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-yellow'>06-C</span> : Il y a un problème avec la structuration du header, il lui manque le role=banner [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    }
  }
  if (!only_redactor) {
    const nia06c2_nodes = document.querySelector('header[role="banner"]');
    let nia06c2_counter = 0;
    if (nia06c2_nodes == null || nia06c2_nodes.length == 0) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-red'>06-C</span> : Il n'y a aucun element header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    } else if (nia06c2_nodes.length > 1) {
      // il peut y en avoir plusieurs mais 1 seul doit être visible
      for (let i = 0; i < nia06c2_nodes.length; i++) {
        if (isItemVisible(nia06c2_nodes[i])) {
          nia06c2_counter++;
        }
        if (nia06c2_counter > 1) {
          setItemToResultList(
            'dev',
            "<li><span class='result-focus label-red'>06-C</span> : Il y a un plusieur elements header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
          );
          setItemsOutline(nia06c2_nodes, 'red', 'nia06c2', '06-C');
          break;
        }
      }
    }

    const nia06c3_nodes = document.querySelector('main header[role="banner"]');
    if (nia06c3_nodes != null && nia06c3_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-red'>06-C</span> : Il y a un problème avec la structuration du header, celui-ci ne dois pas être enfant de la balise main [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
      setItemsOutline(nia06c3_nodes, 'red', 'nia06c3', '06-C');
    }
  }
}
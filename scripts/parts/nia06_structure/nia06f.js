// F. Vérifier que la zone de contenu principal est structurée au moyen d’un élément <main> ;
function check_test_06f() {
  // Si le document possède plusieurs éléments <main>, vérifier qu’un seul de ces éléments est visible (les autres occurrences de l’élément sont pourvues d’un attribut hidden) ;
  // <main id="main" class="page-main " role="main">
  if (!only_redactor) {
    const nia06f1_nodes = document.querySelectorAll('main:not([role="main"])');
    if (
      nia06f1_nodes &&
      nia06f1_nodes.length > 0 &&
      isItemsVisible(nia06f1_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06f1' class='result-focus label-orange'>06-F</a> : Présence d'une zone de contenu principal sans attribut role</li>"
      );
      setItemsOutline(nia06f1_nodes, 'orange', 'nia06f1', '06-F');
    }

    const nia06f2_nodes = document.querySelectorAll('main');
    let nia06f2_counter = 0;
    if (nia06f2_nodes && nia06f2_nodes.length > 1) {
      for (let i = 0; i < nia06f2_nodes.length; i++) {
        if (isItemVisible(nia06f2_nodes[i])) {
          nia06f2_counter++;
        }
        if (nia06f2_counter > 1) {
          setItemToResultList(
            'nc',
            "<li><a href='#' data-destination='nia06f2' class='result-focus label-red'>06-F</a> : Présence de plusieurs zone de contenu principal [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
          );
          setItemsOutline(nia06f2_nodes, 'red', 'nia06f2', '06-F');
          break;
        }
      }
    }
  }
}

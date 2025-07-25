// E. Vérifier que l’élément <nav> n’est pas utilisé en dehors de la structuration des zones de navigation principales et secondaires ;
function check_test_06e() {
  if (!only_redactor) {
    const nia06e1_nodes = document.querySelectorAll(
      'nav:not([role="navigation"])'
    );
    if (
      nia06e1_nodes &&
      nia06e1_nodes.length > 0 &&
      isItemsVisible(nia06e1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06e1' class='result-focus label-red'>06-E</a> : Présence d'une zone de navigation sans attribut role</li>"
      );
      setItemsOutline(nia06e1_nodes, 'red', 'nia06e1', '06-E');
    }
  }

  // Les principales barres de navigation (critère 12.2) sont :
  // - Un menu de navigation ;
  // - Un fil d’ariane ;
  // - Une liste de navigation d’une liste de résultats ;
  // - Des liens d’évitement.

  // Il existe différents types de menu de navigation (critère 12.1 et critère 12.2) :
  // - Menu de navigation principal ;
  // - Menu de sous-rubrique ;
  // - Menu contextuel ;
  // - Table des matières concernant un ensemble de pages.

  if (!only_redactor && isAEM) {
    const nia06e2_nodes = document.querySelectorAll(
      '*:not(.page-langs):not(.right-part):not(.cmp-directory):not(.top-container):not(.skiplinks):not(.navigation-wrapper) > nav:not(.page-headernav):not(.page-headernavmobile):not(.page-headernav-desk):not(.automaticnav):not(.cmp-breadcrumb):not(.page-localnav):not(.cmp-backtonav):not(.cmp-breadcrumb-demarches):not(.topnav):not(.page-bloub):not(#headernav):not(#headernav-desktop):not(.headernav-detached):not(.headernav):not(.headernav-fixed)'
    );
    if (
      nia06e2_nodes &&
      nia06e2_nodes.length > 0 &&
      isItemsVisible(nia06e2_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06e2' class='result-focus label-red'>06-E</a> : Présence d'une balise nav utilisé en dehors d'une zone de navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
      setItemsOutline(nia06e2_nodes, 'red', 'nia06e2', '06-E');
    }
  }
}

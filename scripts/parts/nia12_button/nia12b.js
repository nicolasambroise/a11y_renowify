// B Bouton TopSearch
function check_test_12b() {
  if (isAEM) {
    const nia12b1_nodes = document.querySelectorAll(
      'html[lang="fr"] #topsearch > #search-field-top:not([title^="Rechercher"])'
    );
    const nia12b2_nodes = document.querySelectorAll(
      'html[lang="fr"] #topsearch > #search-field-top:not([placeholder^="Rechercher"])'
    );
    const nia12b3_nodes = document.querySelectorAll(
      'html[lang="fr"] #topsearch > button:not([title^="Rechercher"])'
    );
    if (
      (nia12b1_nodes &&
        nia12b1_nodes.length > 0 &&
        isItemsVisible(nia12b1_nodes)) ||
      (nia12b2_nodes &&
        nia12b2_nodes.length > 0 &&
        isItemsVisible(nia12b2_nodes)) ||
      (nia12b3_nodes &&
        nia12b3_nodes.length > 0 &&
        isItemsVisible(nia12b3_nodes))
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia12b' class='result-focus label-red'>12-B</a> : Problème dans les intitulés du champ de recherche (title et placeholder)</li>"
      );
      setItemsOutline(nia12b1_nodes, 'red', 'nia12b', '12-B');
      setItemsOutline(nia12b2_nodes, 'red', 'nia12b', '12-B');
      setItemsOutline(nia12b3_nodes, 'red', 'nia12b', '12-B');
    }
  }
}
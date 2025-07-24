/* A. Bouton Role search*/
function check_test_12a() {
  if (!only_redactor && isAEM) {
    const nia12a1_nodes = document.querySelectorAll(
      '.topsearch:not([role="search"])'
    );
    const nia12a2_nodes = document.querySelectorAll(
      'html[lang="fr"] .topsearch:not([aria-label="Globale"])'
    );
    if (
      (nia12a1_nodes &&
        nia12a1_nodes.length > 0 &&
        isItemsVisible(nia12a1_nodes)) ||
      (nia12a2_nodes &&
        nia12a2_nodes.length > 0 &&
        isItemsVisible(nia12a2_nodes))
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia12a' class='result-focus label-red'>12-A</a> : Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)</li>"
      );
      setItemsOutline(nia12a1_nodes, 'red', 'nia12a', '12-A');
      setItemsOutline(nia12a2_nodes, 'red', 'nia12a', '12-A');
    }
  }
}
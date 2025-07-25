/* D. Button avec role */
function check_test_12d() {
  if (!only_redactor && !only_error) {
    const nia12d_nodes = document.querySelectorAll('button[role=button]');
    if (
      nia12d_nodes &&
      nia12d_nodes.length > 0 &&
      isItemsVisible(nia12d_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia12d' class='result-focus label-yellow'>12-D</a> : Il n'est pas nécessaire d'ajouter un role button sur un éléments boutons</li>"
      );
      setItemsOutline(nia12d_nodes, 'yellow', 'nia12d', '12-D');
    }
  }
}

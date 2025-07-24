// K Abréviations : mise en évidence
function check_test_06k() {
  if (!only_error && !only_redactor) {
    const nia06k_nodes = document.querySelectorAll('abbr:not([title])');
    if (
      nia06k_nodes &&
      nia06k_nodes.length > 0 &&
      isItemsVisible(nia06k_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06k' class='result-focus label-yellow'>06-K</a> : Présence d'abréviation non explicitée</li>"
      );
      setItemsOutline(nia06k_nodes, 'yellow', 'nia06k', '06-K');
    }
  }
}
// C. Attribut de tableaux deprecated
function check_test_08c() {
  if (!only_error) {
    const nia08c_nodes = document.querySelectorAll('th[header], td[header]');
    if (
      nia08c_nodes &&
      nia08c_nodes.length > 0 &&
      isItemsVisible(nia08c_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia08c' class='result-focus label-yellow'>08-C</a> : Presence attributs header obsolete dans un tableau</li>"
      );
      setItemsOutline(nia08c_nodes, 'yellow', 'nia08c', '08-C');
    }
  }
}

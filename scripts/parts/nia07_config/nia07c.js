// C. Tooltip
function check_test_07c() {
  if (isAEM) {
    const nia07c_nodes = document.querySelectorAll('.search-view');
    if (
      nia07c_nodes &&
      nia07c_nodes.length > 0 &&
      isItemsVisible(nia07c_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia07c' class='result-focus label-red'>07-C</a> : Présence de tooltip non accessible sur les résultats de recherches [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-13-1' target='_blank'>RAWeb 10.13.1</a>]</li>"
      );
      setItemsOutline(nia07c_nodes, 'red', 'nia07c', '07-C');
    }
  }
}
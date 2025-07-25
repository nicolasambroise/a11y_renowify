// G. Présence de liens sans href
function check_test_03g() {
  if (!only_error) {
    const nia03g_nodes = document.querySelectorAll(
      'a:not([href]),[role="link"]:not([href])'
    );
    if (
      nia03g_nodes &&
      nia03g_nodes.length > 0 &&
      isItemsVisible(nia03g_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03g' class='result-focus label-yellow'>03-G</a> : Présence d'un lien sans destination</li>"
      );
      setItemsOutline(nia03g_nodes, 'yellow', 'nia03g', '03-G');
    }
  }
}

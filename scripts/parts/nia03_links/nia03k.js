//K Liens Pour en savoir plus
function check_test_03k() {
  if (!only_error && isAEM) {
    const nia03k_nodes = document.querySelectorAll(
      '.cmp-focus .focus-more.btn, .cmp-contentbox a.btn'
    );
    if (
      nia03k_nodes &&
      nia03k_nodes.length > 15 &&
      isItemsVisible(nia03k_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03k' class='result-focus label-yellow'>03-K</a> : Trop de liens Pour en savoir plus (" +
          nia03k_nodes.length +
          ')</li>'
      );
      setItemsOutline(nia03k_nodes, 'yellow', 'nia03k', '03-K');
    }
  }
}

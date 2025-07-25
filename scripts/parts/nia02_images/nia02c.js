// C. Alt vide sur les images de search logique.
function check_test_02c() {
  if (!only_redactor && isAEM) {
    const nia02c_nodes = document.querySelectorAll(
      '.cmp-focus img:not([alt=""])'
    );
    if (
      nia02c_nodes &&
      nia02c_nodes.length > 0 &&
      isItemsVisible(nia02c_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia02c' class='result-focus label-red'>02-C</a> : Présence de " +
          nia02c_nodes.length +
          ' image de search-logic sans attribut alt vide</li>'
      );
      setItemsOutline(nia02c_nodes, 'red', 'nia02c', '02-C');
    }
  }
}

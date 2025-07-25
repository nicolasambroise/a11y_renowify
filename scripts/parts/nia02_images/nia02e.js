// E. Images légendés presence du aria-label sur le figure
function check_test_02e() {
  if (!only_redactor && isAEM) {
    const nia02e_nodes = document.querySelectorAll(
      'figure[data-cmp-hook-image="figure"]:not([aria-label]) figcaption'
    );
    if (
      nia02e_nodes &&
      nia02e_nodes.length > 0 &&
      isItemsVisible(nia02e_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia02e' class='result-focus label-orange'>02-E</a> : Les captions des images ne sont pas correctement restitué, il manque un attribut aria-label sur la balise figure</li>"
      );
      setItemsOutline(nia02e_nodes, 'orange', 'nia02e', '02-E');
    }
  }
}

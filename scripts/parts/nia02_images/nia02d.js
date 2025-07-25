// D. Absence de copyright/caption/légende sur une image Core V3
function check_test_02d() {
  if (!only_redactor && isAEM) {
    const nia02d_nodes = document.querySelectorAll(
      '.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title'
    );
    if (
      nia02d_nodes &&
      nia02d_nodes.length > 0 &&
      isItemsVisible(nia02d_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia02d' class='result-focus label-orange'>02-D</a> : Présence d'un caption non lié correctement à son image</li>"
      );
      setItemsOutline(nia02d_nodes, 'orange', 'nia02d', '02-D');
    }
  }
}

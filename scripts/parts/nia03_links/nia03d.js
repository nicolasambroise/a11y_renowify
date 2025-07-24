// D. Présence d'un conflit dans les attribut de liens
function check_test_03d() {
  if (!only_redactor) {
    const nia03d_nodes = document.querySelectorAll(
      'a[aria-label][aria-labelledby]'
    );
    if (
      nia03d_nodes &&
      nia03d_nodes.length > 0 &&
      isItemsVisible(nia03d_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia03d' class='result-focus label-red'>03-D</a> : Présence d'un conflit dans les attributs des liens</li>"
      );
      setItemsOutline(nia03d_nodes, 'red', 'nia03d', '03-D');
    }
  }
}
// D. Tableau de mise en forme
function check_test_08d() {
  const nia08d_nodes = document.querySelectorAll(
    'table[role="presentation"][summary], table[role="presentation"] :where(caption,thead,th,tfoot,[role="rowheader"],[role="columnheader"],td[scope],td[headers],td[axis])'
  );
  if (nia08d_nodes && nia08d_nodes.length > 0 && isItemsVisible(nia08d_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08d' class='result-focus label-red'>08-D</a> : Presence d'élements incompatible avec un tableau de mise en forme [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-8-1' target='_blank'>RAWeb 5.8.1</a>]</li>"
    );
    setItemsOutline(nia08d_nodes, 'red', 'nia08d', '08-D');
  }
}

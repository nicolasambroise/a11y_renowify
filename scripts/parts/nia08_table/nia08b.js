// B. Attribut deprecated
function check_test_08b() {
  const nia08b_nodes = document.querySelectorAll(
    ':where([role="table"],table):where([align],[bgcolor],[border],[frame],[cellpadding],[cellspacing],[width],[summary],[rules])'
  );
  if (nia08b_nodes && nia08b_nodes.length > 0 && isItemsVisible(nia08b_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08b' class='result-focus label-red'>08-B</a> : Presence d'attribut obsolete sur un tableau</li>"
    );
    setItemsOutline(nia08b_nodes, 'red', 'nia08b', '08-B');
  }
}
// A. Attribut de tableau
function check_test_08a() {
  const nia08a_nodes = document.querySelectorAll(
    ':where([role="table"],table:not([role="presentation"])) th:not([scope="row"]):not([scope="col"]):not([id]):not([headers]):not([role="rowheader"]):not([role="columnheader"]):not(:only-child)'
  );
  if (nia08a_nodes && nia08a_nodes.length > 0 && isItemsVisible(nia08a_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08a' class='result-focus label-red'>08-A</a> : Absence de l'attribut scope sur les en-tete de tableau [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-7-1' target='_blank'>RAWeb 5.7.1</a>]</li>"
    );
    setItemsOutline(nia08a_nodes, 'red', 'nia08a', '08-A');
  }
}
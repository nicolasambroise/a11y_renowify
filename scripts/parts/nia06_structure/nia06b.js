// B. Vérifier que le liste <ul> et <ol> ne contienne que des <li> ou [role="listitem"]
function check_test_06b() {
  const nia06b_nodes = document.querySelectorAll(
    ':where(ul,ol,[role="list"]) > *:not(li):not([role="listitem"]):not(.checkA11YSpan)'
  );
  if (nia06b_nodes && nia06b_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia06b' class='result-focus label-red'>06-B</a> : Présence d'un élement non autorisé dans une liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
    );
    setItemsOutline(nia06b_nodes, 'red', 'nia06b', '06-B');
  }
}
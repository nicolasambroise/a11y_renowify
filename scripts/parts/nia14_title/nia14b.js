// B. Aria-level sans heading
function check_test_14b() {
  const nia14b_nodes = document.querySelectorAll(
    '[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])'
  );
  if (nia14b_nodes && nia14b_nodes.length > 0 && isItemsVisible(nia14b_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia14b' class='result-focus label-red'>14-B</a> : Présence d'attribut aria-level en dehors de titre</li>"
    );
    setItemsOutline(nia14b_nodes, 'red', 'nia14b', '14-B');
  }
}

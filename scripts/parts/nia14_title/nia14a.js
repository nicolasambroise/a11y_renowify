// A. Heading avec role
function check_test_14a() {
  const nia14a_nodes = document.querySelectorAll(
    'h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])'
  );
  if (nia14a_nodes && nia14a_nodes.length > 0 && isItemsVisible(nia14a_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia14a' class='result-focus label-red'>14-A</a> : Présence de titre avec un attribut role</li>"
    );
    setItemsOutline(nia14a_nodes, 'red', 'nia14a', '14-A');
  }
}
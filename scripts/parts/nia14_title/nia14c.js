// C. Heading caché au outil d'assistance
function check_test_14c() {
  if (!only_redactor) {
    const nia14c_nodes = document.querySelectorAll(
      'h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]'
    );
    if (
      nia14c_nodes &&
      nia14c_nodes.length > 0 &&
      isItemsVisible(nia14c_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia14c' class='result-focus label-red'>14-C</a> : Présence de titre caché aux outils d'assistance</li>"
      );
      setItemsOutline(nia14c_nodes, 'red', 'nia14c', '14-C');
    }
  }
}
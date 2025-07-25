// F. 2 Heading H1 : Conforme seulement si pertinent
function check_test_14f() {
  if (!only_error) {
    const nia14f_nodes = document.querySelectorAll(
      'h1, [role="heading"][aria-level="1"]'
    );
    let nia14f_flag = false;
    let nia14f_counter = 0;
    if (
      nia14f_nodes &&
      nia14f_nodes.length > 1 &&
      isItemsVisible(nia14f_nodes)
    ) {
      for (let i = 0; i < nia14f_nodes.length; i++) {
        if (isItemVisible(nia14f_nodes[i])) {
          nia14f_counter++;
        }
      }
      if (nia14f_counter > 1) nia14f_flag = true;
    }
    if (nia14f_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia14f' class='result-focus label-yellow'>14-F</a> : Présence de 2 titres H1. Pertinence de ceux-ci à vérifier manuellement</li>"
      );
      setItemsOutline(nia14f_nodes, 'yellow', 'nia14f', '14-F');
    }
  }
}

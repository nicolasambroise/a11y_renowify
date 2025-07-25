// B. Presence de lorem ipsum
function check_test_11b() {
  if (!isPrototype && !only_redactor) {
    const nia11b_nodes = document.querySelectorAll('.cmp-text');
    let nia11b_flag = false;
    if (nia11b_nodes && nia11b_nodes.length > 0) {
      for (let i = 0; i < nia11b_nodes.length; i++) {
        if (nia11b_nodes[i].textContent.includes('Lorem ipsum')) {
          setItemOutline(nia11b_nodes[i], 'orange', 'nia11b', '11-B');
          nia11b_flag = true;
        }
      }
    }
    if (nia11b_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia11b' class='result-focus label-orange'>11-B</a> : Présence de \"Lorem ipsum\" sur la page</li>"
      );
    }
  }
}

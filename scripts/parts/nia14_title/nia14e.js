// E. Ordre Heading
function check_test_14e() {
  if (!only_error) {
    const nia14e_nodes = document.querySelectorAll(
      ':where(h1,h2,h3,h4,h5,h6,[role="heading"]):not([aria-hidden])'
    );
    let nia14e_flag = false;
    let nia14e_current_level = 0,
      nia14e_previous_level = 0;
    if (nia14e_nodes && nia14e_nodes.length > 0) {
      for (let i = 0; i < nia14e_nodes.length; i++) {
        if (isItemVisible(nia14e_nodes[i])) {
          if (
            nia14e_nodes[i].tagName == 'H1' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '1' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 1;
          } else if (
            nia14e_nodes[i].tagName == 'H3' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '3' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 3;
          } else if (
            nia14e_nodes[i].tagName == 'H4' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '4' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 4;
          } else if (
            nia14e_nodes[i].tagName == 'H5' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '5' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 5;
          } else if (
            nia14e_nodes[i].tagName == 'H6' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '6' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 6;
          } else {
            nia14e_current_level = 2;
          }
          if (nia14e_current_level - nia14e_previous_level > 1) {
            setItemOutline(nia14e_nodes[i], 'yellow', 'nia14e', '14-E');
            if (debug_flag)
              console.log(
                '  > ' +
                  nia14e_nodes[i].innerText +
                  ' | current : ' +
                  nia14e_current_level +
                  ' | previous :' +
                  nia14e_previous_level
              );
            nia14e_flag = true;
          }
          nia14e_previous_level = nia14e_current_level;
        }
      }
    }
    if (nia14e_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia14e' class='result-focus label-yellow'>14-E</a> : Présence de sauts de titres [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-1' target='_blank'>RAWeb 9.1.1</a>]</li>"
      );
    }
  }
}

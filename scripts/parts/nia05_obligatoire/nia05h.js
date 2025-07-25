// H. Detect double <br>
function check_test_05h() {
  const nia05h_nodes = document.querySelectorAll('br + br');
  let nia05h_container = '';
  let nia05h_flag = false;
  let nia05h_prev_n1, nia05h_prev_n2;
  if (nia05h_nodes && nia05h_nodes.length > 0 && isItemsVisible(nia05h_nodes)) {
    for (let i = 0; i < nia05h_nodes.length; i++) {
      if (isItemVisible(nia05h_nodes[i])) {
        nia05h_prev_n1 = nia05h_nodes[i].previousSibling;
        nia05h_prev_n2 = nia05h_prev_n1.previousSibling;
        /*
				console.log(nia05h_nodes[i]);
				console.log(nia05h_prev_n1);
				console.log(nia05h_prev_n2);
				*/
        if (nia05h_prev_n1.nodeName == 'BR') {
          setItemOutline(nia05h_nodes[i], 'red', 'nia05h', '05-H');
          nia05h_container = nia05h_nodes[i].parentElement;
          nia05h_container.classList.add('checkA11YOutline__red_parent');
          nia05h_flag = true;
        } else if (
          nia05h_prev_n2.nodeName == 'BR' &&
          (nia05h_prev_n1.nodeName == '#text' ||
            nia05h_prev_n1.nodeName == '#comment') &&
          (nia05h_prev_n1.textContent == ' ' ||
            nia05h_prev_n1.textContent == '')
        ) {
          setItemOutline(nia05h_nodes[i], 'red', 'nia05h', '05-H');
          nia05h_container = nia05h_nodes[i].parentElement;
          nia05h_container.classList.add('checkA11YOutline__red_parent');
          nia05h_flag = true;
        }
      }
    }
  }
  if (nia05h_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia05h' class='result-focus label-red'>05-H</a> : Présence de multiple saut de ligne [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>], privilégier l'utilisation du composant separator</li>"
    );
  }
}

// E. fieldset avec legend
function check_test_04e() {
  const nia04e_nodes = document.querySelectorAll('fieldset');
  let nia04e_flag = false;
  if (nia04e_nodes && nia04e_nodes.length > 0) {
    for (let i = 0; i < nia04e_nodes.length; i++) {
      if (isItemVisible(nia04e_nodes[i])) {
        if (
          nia04e_nodes[i].firstElementChild.tagName &&
          nia04e_nodes[i].firstElementChild.tagName == 'LEGEND'
        ) {
          // OK
        } else if (
          nia04e_nodes[i].firstElementChild.firstElementChild &&
          nia04e_nodes[i].firstElementChild.firstElementChild.tagName &&
          nia04e_nodes[i].firstElementChild.firstElementChild.tagName ==
            'LEGEND'
        ) {
          // La balise légend est encapsulée dans un container
        } else if (
          sanitizeText(nia04e_nodes[i].firstElementChild.textContent) == '' &&
          nia04e_nodes[i].firstElementChild.nextSibling &&
          nia04e_nodes[i].firstElementChild.nextSibling.tagName == 'LEGEND'
        ) {
          // Présence d'un élément décoratif avant la balise légende ( un \n, un pseudo-elem, etc.)
        } else {
          setItemsOutline(nia04e_nodes[i], 'red', 'nia04e', '04-E');
          nia04e_flag = true;
        }
      }
    }
  }
  if (nia04e_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04e' class='result-focus label-red'>04-E</a> : Absence de la légende dans un filedset [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-6-1' target='_blank'>RAWeb 11.6.1</a>]'</li>"
    );
  }
}

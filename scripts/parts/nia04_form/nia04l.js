// L Formulaire : bouton avant la fin du formulaire
function check_test_04l() {
  if (!only_error) {
    const nia04l_nodes = document.querySelectorAll('form');
    let nia04l_flag = false;
    let nia04l_childs, nia04l_lastchilds;
    if (nia04l_nodes && nia04l_nodes.length > 0) {
      for (let i = 0; i < nia04l_nodes.length; i++) {
        if (isItemVisible(nia04l_nodes[i])) {
          nia04l_childs = nia04l_nodes[i].querySelectorAll('input , button');
          nia04l_lastchilds = nia04l_childs[nia04l_childs.length - 1];
          if (
            nia04l_lastchilds.tagName == 'BUTTON' ||
            (nia04l_lastchilds.tagName == 'INPUT' &&
              (nia04l_lastchilds.type == 'SUBMIT' ||
                nia04l_lastchilds.type == 'RESET' ||
                nia04l_lastchilds.type == 'BUTTON'))
          ) {
            // OK
          } else {
            setItemOutline(nia04l_nodes[i], 'yellow', 'nia04l', '04-L');
            nia04l_flag = true;
          }
        }
      }
    }
    if (nia04l_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia04l' class='result-focus label-yellow'>04-L</a> : Formulaire avec bouton de soumission mal placé </li>"
      );
    }
  }

}
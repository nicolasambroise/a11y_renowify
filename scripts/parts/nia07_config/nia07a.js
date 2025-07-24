// A. Position de bouton menu
function check_test_07a() {

  if (!only_redactor && isAEM) {
    const nia07a_nodes = document.querySelectorAll(
      'button.anchor[data-destination^="#headernav"]:not(.anchor-close)'
    );
    let nia07a_flag = false;
    if (nia07a_nodes && nia07a_nodes.length > 0) {
      for (let i = 0; i < nia07a_nodes.length; i++) {
        if (nia07a_nodes[i].closest('nav') == null) {
          setItemOutline(nia07a_nodes[i], 'red', 'nia07a', '07-A');
          nia07a_flag = true;
        }
      }
    }
    if (nia07a_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07a' class='result-focus label-red'>07-A</a> : Présence du bouton d'ouverture du menu en dehors de la balise nav</li>"
      );
    }
  }
}
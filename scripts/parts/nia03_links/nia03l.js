// L Présence de soulignement en dehors de lien
function check_test_03l() {
  if (!only_error) {
    const nia03l_nodes = document.querySelectorAll(
      'body *:not(a):not(mark):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(button)'
    );
    let nia03l_flag = false;
    if (
      nia03l_nodes &&
      nia03l_nodes.length > 0 &&
      isItemsVisible(nia03l_nodes)
    ) {
      for (let i = 0; i < nia03l_nodes.length; i++) {
        if (
          isItemVisible(nia03l_nodes[i]) &&
          window.getComputedStyle(nia03l_nodes[i], null).textDecorationLine ==
            'underline'
        ) {
          setItemOutline(nia03l_nodes[i], 'yellow', 'nia03l', '03-L');
          nia03l_flag = true;
        }
      }
    }
    if (nia03l_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03l' class='result-focus label-yellow'>03-L</a> : Réservez le soulignement aux liens</li>"
      );
    }
  }
}

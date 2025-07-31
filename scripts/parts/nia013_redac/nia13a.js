// A. Presence de triple espace (double concidéré comme erreur d'inattention)
function check_test_13a() {
  if (!only_error) {
    const nia13a_nodes = document.querySelectorAll(
      '.cmp-text, *:not(.cmp-text) > p'
    );
    let nia13a_flag = false;
    let nia13a_result1, nia13a_result2;
    if (nia13a_nodes && nia13a_nodes.length > 0) {
      for (let i = 0; i < nia13a_nodes.length; i++) {
        if (isItemVisible(nia13a_nodes[i])) {
          nia13a_result1 = nia13a_nodes[i].innerText.match(/ {3,}/g);
          nia13a_result2 = nia13a_nodes[i].innerText.match(/\s{4,}/g);
          if (nia13a_result1 && nia13a_result1.length > 0) {
            setItemOutline(nia13a_nodes[i], 'yellow', 'nia13a', '13-A');
            nia13a_flag = true;
          }
          if (nia13a_result2 && nia13a_result2.length > 0) {
            setItemOutline(nia13a_nodes[i], 'yellow', 'nia13a', '13-A');
            nia13a_flag = true;
          }
        }
      }
    }
    if (nia13a_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia13a' class='result-focus label-yellow'>13-A</a> : Présence d'espaces pour créer des effets de marges ou d'alignement (touche espace ou retour à la ligne) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-3' target='_blank'>RAWeb 10.1.3</a>]</li>"
      );
    }
  }
}

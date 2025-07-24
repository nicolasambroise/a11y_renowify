// K Présence de label de bouton insuffisament pertinent
function check_test_04k() {
  if (!only_error && isAEM) {
    const nia04k_nodes = document.querySelectorAll(
      "input[type='submit'], input[type='reset'], input[type='button']"
    );
    let nia04k_array = [
      'envoyer',
      'effacer',
      'annuler',
      'confirmer',
      'valider',
      'poursuivre',
      'rechercher'
    ];
    let nia04k_flag = false;
    let nia04k_label = '';
    if (nia04k_nodes && nia04k_nodes.length > 0) {
      for (let i = 0; i < nia04k_nodes.length; i++) {
        if (isItemVisible(nia04k_nodes[i])) {
          nia04k_label = nia04k_nodes[i].value;
          if (nia04k_label && nia04k_array.includes(nia04k_label)) {
            setItemOutline(nia04k_nodes[i], 'yellow', 'nia04k', '04-K');
            nia04k_flag = true;
          }
        }
      }
    }
    if (nia04k_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia04k' class='result-focus label-yellow'>04-K</a> : Présence de label de bouton insuffisament pertinent  </li>"
      );
    }
  }
}
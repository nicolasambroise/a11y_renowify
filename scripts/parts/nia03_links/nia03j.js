// J Vérifie la présence de l'attribut target_blank sur les liens externe (Exception : On ne regarde pas dans les flux sociaux car le contenu provient d'un aggregateur)
function check_test_03j() {
  let url = window.location.host;
  if (!url) {
    return '';
  }

  if (!only_redactor) {
    const nia03j_nodes = document.querySelectorAll(
      'a[href^="http"]:not([href*="' + url + '"]):not([target="_blank"])'
    );
    let nia03j_flag = false;
    if (
      nia03j_nodes &&
      nia03j_nodes.length > 0 &&
      isItemsVisible(nia03j_nodes)
    ) {
      for (let i = 0; i < nia03j_nodes.length; i++) {
        if (
          isItemVisible(nia03j_nodes[i]) &&
          nia03j_nodes[i].closest('.feed-wrapper') == null
        ) {
          setItemOutline(nia03j_nodes[i], 'orange', 'nia03j', '03-J');
          nia03j_flag = true;
        }
      }
    }
    if (nia03j_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03i' class='result-focus label-orange'>03-J</a> : Présence de liens externes qui s'ouvrent dans la fenêtre courante</li>"
      );
    }
  }
}

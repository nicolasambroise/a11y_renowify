// O. Ajouter un test pour detecter les liens vers le QUAL
function check_test_03o() {
  if (!only_redactor && !only_error && isAEM && !isPreview) {
    const nia03o_nodes = document.querySelectorAll('a');
    let nia03o_flag = false;
    if (nia03o_nodes && nia03o_nodes.length > 0) {
      for (let i = 0; i < nia03o_nodes.length; i++) {
        if (
          isItemVisible(nia03o_nodes[i]) &&
          nia03o_nodes[i].hasAttribute('href') &&
          nia03o_nodes[i].getAttribute('href').includes('wcm-')
        ) {
          setItemOutline(nia03o_nodes[i], 'orange', 'nia03o', '03-O');
          nia03o_flag = true;
        }
      }
    }
    if (nia03o_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia03o' class='result-focus label-orange'>03-O</a> : Présence d'un lien vers un environnement de test.</li>"
      );
    }
  }
}

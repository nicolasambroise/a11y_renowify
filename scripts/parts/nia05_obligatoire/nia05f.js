// F. Id dupliqué
function check_test_05f() {
  if (!only_redactor) {
    const nia05f_nodes = document.querySelectorAll(
      '[id]:not(script):not(link)'
    );
    let nia05f_flag = false;
    let nia05f_ids = {};
    let nia05f_currentId;
    let nia05f_duplicateId = '';
    if (nia05f_nodes && nia05f_nodes.length > 0) {
      for (let i = 0; i < nia05f_nodes.length; i++) {
        nia05f_currentId = nia05f_nodes[i].id
          ? nia05f_nodes[i].id
          : 'undefined';
        if (isNaN(nia05f_ids[nia05f_currentId])) {
          nia05f_ids[nia05f_currentId] = 0;
        } else {
          nia05f_flag = true;
          setItemOutline(nia05f_nodes[i], 'orange', 'nia05f', '05-F');
          nia05f_duplicateId += '"' + nia05f_currentId + '",';
        }
        nia05f_ids[nia05f_currentId]++;
      }
    }
    if (nia05f_flag == true) {
      //console.log(nia05f_ids);
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia05f' class='result-focus label-orange'>05-F</a> : Présence d'Id dupliqué<span class='cy-hidden'> (" +
        nia05f_duplicateId +
        ")</span> [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-2-1' target='_blank'>RAWeb 8.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-identifiant-html-nest-utilise-quune-seule-fois-par-page' target='_blank'>Opquast 229</a>]</li>"
      );
    }
  }
}
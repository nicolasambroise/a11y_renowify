// J. Vérifier que le liste <ul> et <ol> contiennent plusieurs éléments
function check_test_06j() {
  const nia06j_nodes = document.querySelectorAll(
    '*:not(.geoportail-addresses):not(.subnav-item) > ul:not(.cmp-focus-list):not(.article-metas),ol,[role="list"]'
  );
  let nia06j_flag = false;
  let nia06j_result;
  if (nia06j_nodes && nia06j_nodes.length > 0) {
    for (let i = 0; i < nia06j_nodes.length; i++) {
      if (isItemVisible(nia06j_nodes[i])) {
        nia06j_result = nia06j_nodes[i].querySelectorAll(
          'li,[role="listitem"]'
        );
        if (nia06j_result && nia06j_result.length < 2) {
          if (debug_flag) console.log(nia06j_result);
          setItemOutline(nia06j_nodes[i], 'orange', 'nia06j', '06-J');
          nia06j_flag = true;
        }
      }
    }
  }
  if (nia06j_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia06j' class='result-focus label-orange'>06-J</a> : Présence d'une liste à un seul élément [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
    );
  }

  if (!only_error) {
    const nia06j2_nodes = document.querySelectorAll('p');
    let nia06j2_flag = false;
    let nia06j2_result;
    if (nia06j2_nodes && nia06j2_nodes.length > 0) {
      for (let i = 0; i < nia06j2_nodes.length; i++) {
        if (isItemVisible(nia06j2_nodes[i])) {
          nia06j2_result = nia06j2_nodes[i].innerText.trim().match(/^(- )/g);
          if (nia06j2_result && nia06j2_result.length > 0) {
            setItemOutline(nia06j2_nodes[i], 'yellow', 'nia06j2', '06-J');
            nia06j2_flag = true;
          }
        }
      }
    }
    if (nia06j2_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06j2' class='result-focus label-yellow'>06-J</a> : Présence d'une liste simulée avec des tirets</li>"
      );
    }
  }
}

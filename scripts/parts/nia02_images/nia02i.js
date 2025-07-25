// I Chaque image-lien est dotée d'une alternative textuelle appropriée.
function check_test_02i() {
  if (!only_error) {
    const nia02i_nodes = document.querySelectorAll(
      'a:not(.blocklink):not([role="button"]):has(> img),a:not(.blocklink):not([role="button"]):has(> svg)'
    );
    let nia02i_title = '';
    let nia02i_flag = false;
    if (nia02i_nodes && nia02i_nodes.length > 0) {
      for (let i = 0; i < nia02i_nodes.length; i++) {
        if (isItemVisible(nia02i_nodes[i])) {
          if (
            nia02i_nodes[i].childElementCount == 1 &&
            nia02i_nodes[i].getElementsByTagName('img')[0] != null &&
            nia02i_nodes[i]
              .getElementsByTagName('img')[0]
              .getAttribute('alt') == ''
          ) {
            setItemOutline(nia02i_nodes[i], 'yellow', 'nia02i', '02-I');
            nia02i_flag = true;
          } else if (
            nia02i_nodes[i].childElementCount == 1 &&
            nia02i_nodes[i].getElementsByTagName('svg')[0] != null
          ) {
            setItemOutline(nia02i_nodes[i], 'yellow', 'nia02i', '02-I');
            nia02i_flag = true;
          }
        }
      }
    }
    if (nia02i_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia02i' class='result-focus label-yellow'>02-I</a> : Présence d'image-lien avec une alternative textuelle non pertinente [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>, <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-lien-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'> Opquast 112</a>]</li>"
      );
    }
  }
}

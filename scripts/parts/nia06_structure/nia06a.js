// A. Vérifier qu'il n'y a pas de role sur les container de listes
function check_test_06a() {
  if (!only_redactor && !only_error) {
    const nia06a_nodes = document.querySelectorAll(
      'ul[role]:not([role="list"]):not([role="listbox"]),ol[role]:not([role="list"]):not([role="tablist"]),li[role]:not([role="listitem"]):not([role="option"]),dl[role]:not([role="listitem"])'
    );
    let nia06a_flag = false;
    if (nia06a_nodes && nia06a_nodes.length > 0) {
      for (let i = 0; i < nia06a_nodes.length; i++) {
        if (isItemVisible(nia06a_nodes[i])) {
          // Exception sur la structure des onglet <li role="tab"> https://stackoverflow.com/questions/75955536/what-will-the-role-of-anchor-tag-in-tabs-with-ul-li-structure
          if (
            !(
              nia06a_nodes[i].tagName == 'LI' &&
              nia06a_nodes[i].getAttribute('role') == 'tab' &&
              nia06a_nodes[i].parentElement.getAttribute('role') == 'tablist' &&
              (nia06a_nodes[i].parentElement.tagName == 'UL' ||
                nia06a_nodes[i].parentElement.tagName == 'OL') &&
              ((nia06a_nodes[i].getAttribute('tabindex') == '0' &&
                  nia06a_nodes[i].getAttribute('aria-selected') == 'true') ||
                (nia06a_nodes[i].getAttribute('tabindex') == '-1' &&
                  nia06a_nodes[i].getAttribute('aria-selected') != 'true'))
            )
          ) {
            setItemOutline(nia06a_nodes[i], 'red', 'nia06a', '06-A');
            nia06a_flag = true;
          }
        }
      }
    }
    if (nia06a_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06a' class='result-focus label-red'>06-A</a> : Vérifier qu'il n'y a pas de role sur les container de liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
      );
    }
  }
}
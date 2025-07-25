// A. Absence de lang
function check_test_11a() {
  if (!only_redactor) {
    const nia11a_nodes = document.querySelectorAll('html:not([lang])');
    if (
      nia11a_nodes &&
      nia11a_nodes.length > 0 &&
      isItemsVisible(nia11a_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia11a' class='result-focus label-red'>11-A</a> : Aucune langue défini par défaut sur la page [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-3-1' target='_blank'>RAWeb 8.3.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-indique-la-langue-principale-du-contenu' target='_blank'>Opquast 125</a>]</li>"
      );
      setItemsOutline(nia11a_nodes, 'red', 'nia11a', '11-A');
    }
  }
}

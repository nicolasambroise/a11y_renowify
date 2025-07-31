// C. Presence d'attributs tabindex positif
function check_test_09c() {
  if (!only_redactor) {
    const nia09c_nodes = document.querySelectorAll(
      '[tabindex]:not([tabindex="0"]):not([tabindex="-1"])'
    );
    if (
      nia09c_nodes &&
      nia09c_nodes.length > 0 &&
      isItemsVisible(nia09c_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia09c' class='result-focus label-orange'>09-C</a> : Presence d'attibut tabindex positif [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-8-1' target='_blank'>RAWeb 12.8.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-navigation-au-clavier-seffectue-dans-un-ordre-previsible' target='_blank'>Opquast 162</a>]</li>"
      );
      setItemsOutline(nia09c_nodes, 'orange', 'nia09c', '09-C');
    }
  }
}

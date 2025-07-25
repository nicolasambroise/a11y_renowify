// B. Les pages utilisant le protocole HTTPS ne proposent pas de ressources HTTP.
function check_test_15b() {
  if (!only_error) {
    let nia15b_nodes = document.querySelectorAll(
      'a[target="_blank"][href^="http://"]'
    );
    if (only_redactor)
      nia15b_nodes = document.querySelectorAll(
        '.cmp-text a[target="_blank"][href^="http://"]'
      );
    if (
      nia15b_nodes &&
      nia15b_nodes.length > 0 &&
      isItemsVisible(nia15b_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia15b' class='result-focus label-yellow'>15-B</a> : Les pages utilisant le protocole HTTPS ne doivent pas proposer de ressources HTTP [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-pages-utilisant-le-protocole-https-ne-proposent-pas-de-ressources-http' target='_blank'>Opquast 195</a>]</li>"
      );
      setItemsOutline(nia15b_nodes, 'yellow', 'nia15b', '15-B');
    }
  }
}

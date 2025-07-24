// B. Old tag Nice-to-have
function check_test_10b() {
  // Exception pour les horaires : https://jira.intranet.etat.lu/browse/GUILUV3-1002
  if (!only_error) {
    const nia10b_nodes = document.querySelectorAll(
      'i, *:not(.cmp-hours__list) > * > * > b'
    ); // NtH
    if (
      nia10b_nodes &&
      nia10b_nodes.length > 0 &&
      isItemsVisible(nia10b_nodes)
    ) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia10b' class='result-focus label-yellow'>10-B</a> : Présence de balises 'i' ou 'b', voir pour les remplacer par 'em' et 'strong' lorsque nécessaire</li>"
      );
      setItemsOutline(nia10b_nodes, 'yellow', 'nia10b', '10-B');
    }
  }
}
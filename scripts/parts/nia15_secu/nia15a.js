// A. Les liens externes qui ouvrent une nouvelle fenêtre ne partagent pas d'information de contexte.
function check_test_15a() {
  if (!only_error) {
    let nia15a_nodes = document.querySelectorAll(
      'a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])'
    );
    if (only_redactor)
      nia15a_nodes = document.querySelectorAll(
        '.cmp-text a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])'
      );
    if (
      nia15a_nodes &&
      nia15a_nodes.length > 0 &&
      isItemsVisible(nia15a_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia15a' class='result-focus label-yellow'>15-A</a> : Doter chaque lien ayant un attribut target='_blank' d'un attribut rel='noreferrer noopener'. [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-liens-externes-qui-ouvrent-une-nouvelle-fenetre-ne-partagent-pas-dinformation-de-contexte' target='_blank'>Opquast 25</a>]</li>"
      );
      setItemsOutline(nia15a_nodes, 'yellow', 'nia15a', '15-A');
    }
  }
}
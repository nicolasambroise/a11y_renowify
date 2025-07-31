// C. Problème de langue dans les suffixes
function check_test_03c() {
  if (!only_redactor) {
    const nia03c_nodes = document.querySelectorAll(
      'html:not([lang="fr"]) *:not(.book-download) > a[title$="- Nouvelle fenêtre"]:not([lang="fr"]), html:not([lang="en"]) *:not(.book-download) > a[title$="- New window"]:not([lang="en"]), html:not([lang="de"]) *:not(.book-download) > a[title$="- Neues Fenster"]:not([lang="de"]), html:not([lang="lb"]) *:not(.book-download) > a[title$="- Nei Fënster"]:not([lang="lb"])'
    );
    if (
      nia03c_nodes &&
      nia03c_nodes.length > 0 &&
      isItemsVisible(nia03c_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia03c' class='result-focus label-orange'>03-C</a> : Présence du suffixe 'Nouvelle fenêtre' sur une page non rédigée en français (de même pour les autres langues)</li>"
      );
      setItemsOutline(nia03c_nodes, 'orange', 'nia03c', '03-C');
    }
  }
}

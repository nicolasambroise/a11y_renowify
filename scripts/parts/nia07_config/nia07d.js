// D. Menu langue
function check_test_07d() {
  if (!only_redactor && isAEM) {
    const nia07d1_nodes = document.querySelectorAll(
      'nav[id^="language-"]:not([aria-label]), div > ul.cmp-languagenavigation__group:not([aria-label])'
    );
    if (
      nia07d1_nodes &&
      nia07d1_nodes.length > 0 &&
      isItemsVisible(nia07d1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia07d1' class='result-focus label-red'>07-D</a> : Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)</li>"
      );
      setItemsOutline(nia07d1_nodes, 'red', 'nia07d1', '07-D');
    }

    // Check vieux composant switch lang
    const nia07d2_nodes = document.querySelectorAll(
      '#page-langs ul[role="menu"] > li[role="none"]'
    );
    if (nia07d2_nodes && nia07d2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07d2' class='result-focus label-orange'>07-D</a> : Faiblesse de la structure du menu de switch des langues : ne pas utiliser role=menu</li>"
      );
      setItemsOutline(nia07d2_nodes, 'orange', 'nia07d2', '07-D');
    }

    // Les liens vers les versions linguistique doivent avoir l’attribut lang et posséder le title et le contenu textuel « de – Deutsch »
    const nia07d3_nodes = document.querySelectorAll(
      '.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([title*=" - "]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([lang]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([hreflang])'
    );
    if (
      nia07d3_nodes &&
      nia07d3_nodes.length > 0 &&
      isItemsVisible(nia07d3_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07d3' class='result-focus label-orange'>07-D</a> : Les liens vers les versions linguistique doivent avoir les attributs lang, hreflang et posséder un attribut title dont le contenu textuel est tel que : « de – Deutsch » </li>"
      );
      setItemsOutline(nia07d3_nodes, 'orange', 'nia07d3', '07-D');
    }
  }
}
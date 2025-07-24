// O. La page des résultats de recherche indique le nombre de résultats
function check_test_05o() {
  if (!only_redactor && isSearchLogic && isAEM) {
    const nia05o_isSearch = document.getElementById('mainSearch');
    if (nia05o_isSearch) {
      const nia05o_searchCount = document.querySelector('.search-meta-count');
      if (!nia05o_searchCount || !isItemVisible(nia05o_searchCount)) {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia05o' class='result-focus label-red'>05-O</a> : La page des résultats de recherche indique le nombre de résultats [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-page-des-resultats-de-recherche-indique-le-nombre-de-resultats-le-nombre-de-pages-de-resultats-et-le-nombre-de-resultats-par-page' target='_blank'>Opquast 13</a>]</li>"
        );
        setItemsOutline(nia05o_isSearch, 'red', 'nia05o', '05-O');
      }
    }
  }
}
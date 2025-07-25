// B Page indésirable dans le plan du site
function check_test_09b() {
  if (isSitemap && isAEM) {
    const nia09b_nodes = document.querySelector(
      '.cmp-sitemap a[href*="error.html"]'
    );
    if (nia09b_nodes && isItemVisible(nia09b_nodes)) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia09b' class='result-focus label-orange'>09-B</a> : Presence de la page Error dans le plan du site</li>"
      );
      setItemsOutline(nia09b_nodes.parentElement, 'orange', 'nia09b', '09-B');
    }
  }
}

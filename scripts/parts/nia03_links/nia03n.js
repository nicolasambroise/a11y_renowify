// N. Un lien non_souligné et inclus dans un paragraphe de texte doit être suffisamment contrasté avec le texte environnant (à l’état par défaut, hover et focus). Idéalement, toujours souligner les liens.
function check_test_03n() {
  if (!only_redactor && !only_error) {
    const nia03n_nodes = document.querySelectorAll(
      'main *:not(li.nav-item) > p > a:not(.btn), main *:not(.cmp-autocompleteSearch__keywords) > li:not(.cmp-focus-list-item):not(.nav-item):not(.cmp-languagenavigation__item):not(.cmp-breadcrumb__item):not(.subnav-item):not(.cmp-grid__item ):not(.filter-item):not(.cmp-list__item):not(.pagination-page):not(.pagination-next):not(.pagination-prev) > a:not(.toc-anchor)'
    );
    let nia03n_flag = false;
    if (
      nia03n_nodes &&
      nia03n_nodes.length > 0 &&
      isItemsVisible(nia03n_nodes)
    ) {
      for (let i = 0; i < nia03n_nodes.length; i++) {
        if (
          isItemVisible(nia03n_nodes[i]) &&
          window.getComputedStyle(nia03n_nodes[i], null).textDecorationLine !=
          'underline'
        ) {
          setItemOutline(nia03n_nodes[i], 'yellow', 'nia03n', '03-N');
          nia03n_flag = true;
        }
      }
    }
    if (nia03n_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia03n' class='result-focus label-yellow'>03-N</a> : Présence d'un lien non souligné, vérifier son contraste avec le texte environnant</li>"
      );
    }
  }
}
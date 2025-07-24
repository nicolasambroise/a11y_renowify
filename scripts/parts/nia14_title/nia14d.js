// D. Heading simulé
function check_test_14d() {
  if (!only_error) {
    const nia14d_nodes = document.querySelectorAll(
      'b,p:not(.cmp-form__mandatory-text) > strong:first-child ,span > strong:first-child ,div > strong:first-child , *:not(.accordionItem) > *:not(figcaption):not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content):not(.meta-themes):not(.description):not(.meta-published-update) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):not(.orejime-Notice-description):first-child'
    );
    let nia14d_flag = false;
    if (nia14d_nodes && nia14d_nodes.length > 0) {
      for (let i = 0; i < nia14d_nodes.length; i++) {
        if (isItemVisible(nia14d_nodes[i]) && nia14d_nodes[i].length < 150) {
          //boucle pour exclure les textes de plus de 150 caractères
          setItemsOutline(nia14d_nodes[i], 'yellow', 'nia14d', '14-D');
          nia14d_flag = true;
        }
      }
    }
    if (nia14d_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia14d' class='result-focus label-yellow'>14-D</a> : Présence de texte ressemblant à des titres n'étant pas balisé comme tel - A vérifier au cas par cas [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-3' target='_blank'>RAWeb 9.1.3</a>]</li>"
      );
    }
  }

}
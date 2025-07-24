// E. Video player
function check_test_07e() {
  if (!only_redactor && isAEM) {
    const nia07e_nodes = document.querySelectorAll(
      '.cmp-multiplayer .player_img img[alt="Lire la vidéo Youtube, voir légende ci-après"][lang]:not([lang="fr"])'
    );
    if (
      nia07e_nodes &&
      nia07e_nodes.length > 0 &&
      isItemsVisible(nia07e_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07e' class='result-focus label-orange'>07-E</a> : Traduction manquante dans le composant Multimedia Player</li>"
      );
      setItemsOutline(nia07e_nodes, 'orange', 'nia07e', '07-E');
    }
  }
}
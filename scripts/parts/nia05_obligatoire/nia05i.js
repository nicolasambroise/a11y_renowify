// I. Le code source de chaque page contient une métadonnée qui en décrit le contenu. ==> Présence de meta name=description
function check_test_05i() {
  if (!only_error && !isSearchLogic && !isSitemap) {
    const nia05i_node = document.querySelector('meta[name="description"]');
    if (
      nia05i_node == null ||
      nia05i_node.content == null ||
      nia05i_node.content == ''
    ) {
      setItemToResultList(
        'nth',
        "<li><span class='result-focus label-yellow'>05-I</span> : Absence de métadonnée qui en décrit le contenu [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-en-decrit-le-contenu' target='_blank'>Opquast 3</a>]</li>"
      );
    }
  }
}

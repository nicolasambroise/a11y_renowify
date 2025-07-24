// J. Le code source des pages contient un appel valide à une icône de favori.
function check_test_05j() {
  if (!only_error) {
    const nia05j_node = document.querySelector("link[rel*='icon']");
    if (
      nia05j_node == null ||
      nia05j_node.getAttribute('href') == null ||
      nia05j_node.getAttribute('href') == ''
    ) {
      setItemToResultList(
        'nth',
        "<li><span class='result-focus label-yellow'>05-J</span> : Absence de Favicon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-des-pages-contient-un-appel-valide-a-un-icone-de-favori' target='_blank'>Opquast 99</a>]</li>"
      );
    }
  }
}
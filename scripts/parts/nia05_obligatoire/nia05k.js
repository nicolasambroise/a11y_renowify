// K. Chaque page affiche une information permettant de connaître son emplacement dans l'arborescence du site.
function check_test_05k() {
  if (!isHomepage && !only_redactor && isAEM && !only_error) {
    const nia05k_node = document.querySelector(
      '.cmp-breadcrumb,.cmp-breadcrumb-demarches'
    );
    if (!nia05k_node) {
      setItemToResultList(
        'nth',
        "<li><span class='result-focus label-yellow'>05-K</span> : Absence de Fils d'Ariane [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-affiche-une-information-permettant-de-connaitre-son-emplacement-dans-larborescence-du-site' target='_blank'>Opquast 151</a>]</li>"
      );
    }
  }
}

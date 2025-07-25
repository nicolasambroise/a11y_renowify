// D. Vérifier que les zones de navigation principales et secondaires sont structurées au moyen d’un élément <nav> ;
function check_test_06d() {
  // <nav class="page-headernav" role="navigation" aria-label="Menu principal" id="headernav">
  if (!only_redactor && !only_error) {
    const nia06d_nodes = document.querySelectorAll(
      'nav.page-headernav[role="navigation"]'
    );
    if (nia06d_nodes == null) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-yellow'>06-D</span> : Il y a un problème avec la structuration de la navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    }
  }
}

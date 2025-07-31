// L. Le focus clavier n'est ni supprimé ni masqué sur le summary
function check_test_05l() {
  if (!only_redactor) {
    const nia05l_node = document.querySelector('summary');
    if (nia05l_node) {
      nia05l_node.addEventListener('focus', (e) => {
        //console.log(window.getComputedStyle(e.target, null).outline);
        if (window.getComputedStyle(e.target, null).outline == 0) {
          setItemOutline(nia05l_node, 'red', 'nia05l', '05-L');
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia05l' class='result-focus label-red'>05-L</a> : Le focus clavier est supprimé d'un élément accordéon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-focus-clavier-nest-ni-supprime-ni-masque' target='_blank'>Opquast 160</a>]</li>"
          );
        }
      });
      nia05l_node.focus();
    }
  }
}

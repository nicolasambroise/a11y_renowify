// I Lien sur "ici" ou sur "lien"
function check_test_03i() {
  if (!only_error) {
    const nia03i_nodes = document.querySelectorAll('html[lang="fr"] a');
    let nia03i_content = '';
    let nia03i_flag = false;
    if (nia03i_nodes && nia03i_nodes.length > 0) {
      for (let i = 0; i < nia03i_nodes.length; i++) {
        if (isItemVisible(nia03i_nodes[i])) {
          nia03i_content = nia03i_nodes[i].innerHTML;
          if (
            nia03i_content == 'ici' ||
            nia03i_content == 'cliquer ici' ||
            nia03i_content == 'cliquez ici' ||
            nia03i_content == 'lire la suite' ||
            nia03i_content == 'lien'
          ) {
            setItemOutline(nia03i_nodes[i], 'yellow', 'nia03i', '03-I');
            nia03i_flag = true;
          }
        }
      }
    }
    if (nia03i_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03i' class='result-focus label-yellow'>03-I</a> : Présence de liens non pertinent [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'> Opquast 132</a>]</li>"
      );
    }
  }
}

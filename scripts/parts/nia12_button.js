/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-12. Boutons
Vérification des intitulé des boutons : Pour les boutons pour ouvrir la recherche, lancer la recherche, ouvrir les filtres et ouvrir le menu :
o	L'attribut « aria-label » doit être identique à l'attribut title
o	L'attribut « title » doit reprendre à minimum le contenu textuel de celui-ci 
*/
function check_part_12() {
  if (debug_flag) console.log('12 Boutons');

  check_test_12a();
  check_test_12b();
  check_test_12c();
  check_test_12d();

}

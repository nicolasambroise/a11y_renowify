/*- -------------------------------------------------------------------------------- */
/* 🗸 02 Images : Thématique RAWeb 1
Vérification de plusieurs points concernant les images :
o	Présence d’un attribut alt sur toutes les images
o	Vérification des attributs des svg,
o	Alt vide sur les images de search logique.
o	Absence de copyright/caption/légende sur une image Core V3,
o	Images v1 légendés presence du aria-label sur le figure
 */

function check_part_02() {
  if (debug_flag) console.log('02 Images');


  check_test_02a();
  check_test_02b();
  check_test_02c();
  check_test_02d();
  check_test_02e();
  check_test_02f();
  check_test_02g();
  check_test_02h();
  check_test_02i();
  check_test_02j();
}

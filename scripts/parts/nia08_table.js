/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-08 Tableau : Thématique RAWeb 5
Vérification de plusieurs points concernant les tableaux
 o Présence des bons attributs sur les tableaux « scope » sur les éléments de header
 o Eviter les éléments ajoutés par les copier/coller de word.
 o vérification d’erreurs courantes.
*/
function check_part_08() {
  if (debug_flag) console.log('08 Tableau');

  check_test_08a();
  check_test_08b();
  check_test_08c();
  check_test_08d();
  check_test_08e();
  check_test_08f();
}

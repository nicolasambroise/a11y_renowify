/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-09 Navigation
Vérification de plusieurs points concernant la navigation dans le site
 o Pertinance du plan du site
 o Mise en avant des éléments possédant un tabindex  positif dans le contenu
 */
function check_part_09() {
  if (debug_flag) console.log('09 Navigation');

  check_test_09a();
  check_test_09b();
  check_test_09c();
  check_test_09d();
  check_test_09e();
  check_test_09f();
}

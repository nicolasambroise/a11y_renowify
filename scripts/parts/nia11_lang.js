/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-11. Langue
Vérification de la présence de changement de langue
o Vérifier que le contenu rédigé dans une langue étrangère possède un attribut « lang » pertinent
*/
function check_part_11() {
  if (debug_flag) console.log('11 Langue');

  check_test_11a();
  check_test_11b();
  check_test_11c();
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-07 AEM Component 
Vérification de plusieurs points concernant la configuration des composants AEM suivant :
 o Menu 
 o Tooltip
 o Recherche
 o etc.
 
 -- Possibilité de splitter encore plus la recherche et le menu 
*/
function check_part_07() {
  if (debug_flag) console.log('07 AEM Component');

  check_test_07a();
  check_test_07b();
  check_test_07c();
  check_test_07d();
  check_test_07e();
  check_test_07f();
  check_test_07g();
  
}

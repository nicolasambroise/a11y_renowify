/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-15. Securité */

function check_part_15() {
  if (debug_flag) console.log('15 Sécurité');

  check_test_15a();
  check_test_15b();
  check_test_15c();
  check_test_15d();
  check_test_15e();

  /* TODO
	Règle n°185 : Une famille générique de police est indiquée comme dernier élément de substitution.
	Règle n°208 : Le serveur ne communique pas d'informations sur les logiciels et langages utilisés.
	*/

}

/*- ------------------------------------------------------------------------------- */
/* 🗸 NIA-14 Title : Mise en avant des titres (<Hn> et ceux qui ont les roles=heading).
o Vérification de la présence de titres simulés - S’assurer que les titres sont bien balisés avec des balises <Hn> et pas seulement avec du gras.
o S’assurer que les titres sont dans le bon ordre*/
function check_part_14() {
  if (debug_flag) console.log('14 Titre');

  check_test_14a();
  check_test_14b();
  check_test_14c();
  check_test_14d();
  check_test_14e();
  check_test_14f();
  
}

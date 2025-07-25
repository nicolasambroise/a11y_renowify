/*- -------------------------------------------------------------------------------- */
/* 🗸 01. Couleur
Vérification de plusieurs points concernant les contrastes de couleur :
 o Contraste des textes
 o Contraste des bordures de champ et du placeholder
 o Contraste de l'outline [A FINIR]
 o Présence de dégradé sans couleur de replis
 o Présence d'une déclaration de couleur de texte et de BG sur la balise <body>
 */
function check_part_01() {
  if (debug_flag) console.log('01 Couleur');

  check_test_01a();
  check_test_01b();
  check_test_01c();
  check_test_01d();
  check_test_01e();
  check_test_01f();
}

// R. Structure du titre de la page
function check_test_05r() {
  // - Présence d’un <title> pertinent (par rapport à la Nomenclature : contient à minimum [h1] [Nom du site] [Luxembourg])
  if (isCTIE && !only_error) {
    let nia05r_title = document.getElementsByTagName('title')[0].innerText;
    if (!nia05r_title.includes('Luxembourg')) {
      setItemToResultList(
        'man',
        "<li><span class='result-focus label-yellow'>05-R</span> : Vérifier que le titre de l'onglet respecte la nomenclature du CTIE</li>"
      );
    }
  }
}

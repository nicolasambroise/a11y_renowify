// C. Check intitulé bouton envoi
function check_test_04c() {
  if (!only_error && isAEM) {
    const nia04c_btn = document.querySelector(
      'html[lang="fr"] main form button.cmp-form-button[type="SUBMIT"][name="preview"]'
    );
    if (nia04c_btn && nia04c_btn.textContent != 'Prévisualiser puis envoyer') {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia04c' class='result-focus label-yellow'>04-C</a> : Vérifier si le bouton de soumission possède bien l'intitulé \"Prévisualiser puis envoyer\" [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-12-1' target='_blank'>RAWeb 11.12.1</a>]</li>"
      );
      setItemOutline(nia04c_btn, 'yellow', 'nia04c', '04-C');
    }
  }
}

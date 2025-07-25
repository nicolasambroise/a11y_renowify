// R Back-To-Top
function check_test_06r() {
  // L’élément Back_to_Top présent en Desktop doit également être présent en mobile
  // L’élément Back_to_Top doit être un lien ancre qui cible #top
  // L’élément Back_to_Top doit avoir un attribut title ainsi qu’une balise <span> « haut de page » (cette dernière peut_être visuellement masquée)

  if (!only_redactor && !only_error && isAEM) {
    const nia06r1_nodes = document.querySelectorAll('a.back');
    if (!nia06r1_nodes || nia06r1_nodes.length == 0) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia06r1' class='result-focus label-yellow'>06-R</a> : Vérifier la présence du bouton de retour en haut de page (exception page avec peu de contenu)</li>"
      );
      setItemsOutline(nia06r1_nodes, 'yellow', 'nia06r1', '06-R');
    }

    const nia06r2_nodes = document.querySelectorAll(
      'a.back:not(:is([href="#top"],[href="#"]))'
    );
    if (nia06r2_nodes && nia06r2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06r2' class='result-focus label-yellow'>06-R</a> : L’élément Back_to_Top doit être un lien ancre qui cible #top</li>"
      );
      setItemsOutline(nia06r1_nodes, 'yellow', 'nia06r2', '06-R');
    }

    const nia06r3_nodes = document.querySelectorAll('a.back:not([title]) ');
    if (nia06r3_nodes && nia06r3_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06r3' class='result-focus label-yellow'>06-R</a> : L’élément Back_to_Top doit avoir un attribut title</li>"
      );
      setItemsOutline(nia06r3_nodes, 'yellow', 'nia06r3', '06-R');
    }
  }
}

// M. Les styles ne justifient pas le texte.
function check_test_05m() {
  if (!only_error) {
    const nia05m_node = document.querySelector('p');
    if (nia05m_node && nia05m_node.style.textAlign == 'justify') {
      setItemOutline(nia05m_node, 'yellow', 'nia05m', '05-M');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05m' class='result-focus label-yellow'>05-M</a> : Présence de texte justifié [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-styles-ne-justifient-pas-le-texte' target='_blank'>Opquast 186</a>]</li>"
      );
    }
  }
}
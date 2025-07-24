// M. Présence de liens avec un espace dans le href
function check_test_03m() {
  const nia03m_nodes = document.querySelectorAll(
    'a[href*=" "],[role="link"][href*=" "]'
  );
  if (nia03m_nodes && nia03m_nodes.length > 0 && isItemsVisible(nia03m_nodes)) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia03m' class='result-focus label-orange'>03-M</a> : Présence d'un lien erroné (espace present dans l'attribut href)</li>"
    );
    setItemsOutline(nia03m_nodes, 'orange', 'nia03m', '03-M');
  }
}
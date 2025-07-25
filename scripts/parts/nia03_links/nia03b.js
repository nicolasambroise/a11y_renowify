// B. Verification de titre vide
function check_test_03b() {
  const nia03b_nodes = document.querySelectorAll(
    'a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"]'
  );
  if (nia03b_nodes && nia03b_nodes.length > 0 && isItemsVisible(nia03b_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03b' class='result-focus label-red'>03-B</a> : Vérifier qu'il n'y a pas de lien avec un titre non pertinant [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6.1.1' target='_blank'>RAWeb 6.1.1</a>]</li>"
    );
    setItemsOutline(nia03b_nodes, 'red', 'nia03b', '03-B');
  }
}

// A. Bloc vide
function check_test_05a() {
  const nia05a_nodes = document.querySelectorAll(
    '*:not(.ol-attribution) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li, dl, dd, dt):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):empty'
  );
  if (nia05a_nodes && nia05a_nodes.length > 0 && isItemsVisible(nia05a_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia05a' class='result-focus label-orange'>05-A</a> : Présence de balise vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>"
    );
    for (let i = 0; i < nia05a_nodes.length; i++) {
      if (isItemVisible(nia05a_nodes[i])) {
        setItemOutline(nia05a_nodes[i], 'orange', 'nia05a', '05-A');
        nia05a_nodes[i].parentElement.classList.add(
          'checkA11YOutline__orange_parent'
        );
      }
    }
  }
}

// B. Bloc vide avec $nbsp; ou \n
function check_test_05b() {
  const nia05b_nodes = document.querySelectorAll(
    '*:not(.ol-attribution):not([aria-hidden="true"]) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li, dl, dd, dt):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(:empty)'
  );
  let nia05b_flag = false;
  let nia05b_clean_node = '',
    nia05b_lang = '';
  if (nia05b_nodes && nia05b_nodes.length > 0) {
    for (let i = 0; i < nia05b_nodes.length; i++) {
      if (nia05b_nodes[i].childElementCount == 0) {
        nia05b_lang = nia05b_nodes[i].closest('[lang]').getAttribute('lang');
        nia05b_clean_node = sanitizeText(
          nia05b_nodes[i].innerText,
          nia05b_lang
        );
        if (nia05b_clean_node == '' && isItemVisible(nia05b_nodes[i])) {
          setItemOutline(nia05b_nodes[i], 'orange', 'nia05b', '05-B');
          nia05b_nodes[i].parentElement.classList.add(
            'checkA11YOutline__orange_parent'
          );
          nia05b_flag = true;
        }
      }
    }
  }
  if (nia05b_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia05b' class='result-focus label-orange'>05-B</a> : Présence de balises vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>"
    );
  }
}
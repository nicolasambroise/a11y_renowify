// P. Section vide dans la page
function check_test_05p() {
  if (!only_error) {
    let nia05p_nodes = document.querySelectorAll('section.cmp-section');
    if (only_redactor)
      nia05p_nodes = document.querySelectorAll('main section.cmp-section');
    let nia05p_flag = false;
    let nia05p_clean_node = '',
      nia05p_lang = '',
      nia05p_img;
    if (nia05p_nodes && nia05p_nodes.length > 0) {
      for (let i = 0; i < nia05p_nodes.length; i++) {
        nia05p_lang = nia05p_nodes[i].closest('[lang]').getAttribute('lang');
        nia05p_clean_node = sanitizeText(
          nia05p_nodes[i].innerText,
          nia05p_lang
        );
        nia05p_img = nia05p_nodes[i].querySelectorAll('img,iframe');

        if (
          nia05p_clean_node == '' &&
          isItemVisible(nia05p_nodes[i]) &&
          nia05p_img.length == 0
        ) {
          setItemOutline(nia05p_nodes[i], 'yellow', 'nia05p', '05-P');
          nia05p_flag = true;
        }
      }
    }
    if (nia05p_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05p' class='result-focus label-yellow'>05-P</a> : Présence de section vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>"
      );
    }
  }
}
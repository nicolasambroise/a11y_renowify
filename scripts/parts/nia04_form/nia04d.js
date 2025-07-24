// D. Vérifier si les champs ont bien un label
function check_test_04d() {
  const nia04d_nodes = document.querySelectorAll(
    "input:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])"
  );
  let nia04d_flag1 = false;
  let nia04d_flag2 = false;
  let nia04d_label = '',
    nia04d_id = '';
  if (nia04d_nodes && nia04d_nodes.length > 0) {
    for (let i = 0; i < nia04d_nodes.length; i++) {
      if (isItemVisible(nia04d_nodes[i])) {
        nia04d_id = nia04d_nodes[i].getAttribute('id');
        if (!nia04d_id || nia04d_id == '') {
          setItemOutline(nia04d_nodes[i], 'red', 'nia04d', '04-D');
          nia04d_flag1 = true;
        } else {
          nia04d_label = document.querySelectorAll(
            "label[for='" + nia04d_id + "']"
          );
          if (!nia04d_label || nia04d_label.length == 0) {
            setItemOutline(nia04d_nodes[i], 'red', 'nia04d', '04-D');
            nia04d_flag1 = true;
          } else if (nia04d_label.length > 1) {
            setItemOutline(nia04d_nodes[i], 'red', 'nia04d', '04-D');
            nia04d_flag2 = true;
          }
        }
      }
    }
  }
  if (nia04d_flag1 == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs sans label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>"
    );
  }
  if (nia04d_flag2 == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs avec plus d'un label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>"
    );
  }
}
// F. Required ou aria-required="true" possède un asterisque dans le label
function check_test_04f() {
  if (!only_redactor && isAEM) {
    const nia04f_nodes = document.querySelectorAll(
      'form [required]:not([required="false"]), form [aria-required="true"]'
    );
    const nia04f_desc = document.querySelectorAll(
      '.cmp-ratings, .cmp-form__mandatory-text, .mandatory-label'
    );
    let nia04f_flag = false;
    let nia04f_id, nia04f_label;
    let nia04f_fieldset, nia04f_legend;
    if (nia04f_nodes && nia04f_nodes.length > 0) {
      for (let i = 0; i < nia04f_nodes.length; i++) {
        if (isItemVisible(nia04f_nodes[i])) {
          if (nia04f_nodes[i].parentElement.tagName != 'LABEL') {
            nia04f_id = nia04f_nodes[i].getAttribute('id');
            if (!nia04f_id || nia04f_id == '') {
              setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
              nia04f_flag = true;
            } else {
              nia04f_label = document.querySelectorAll(
                "label[for='" + nia04f_id + "']"
              );
              if (!nia04f_label || nia04f_label.length == 0) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              } else if (!nia04f_label[0].textContent.includes('*')) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              }
            }
          } else {
            // Checkbox / Radio
            nia04f_fieldset = nia04f_nodes[i].closest('fieldset');
            if (!nia04f_fieldset) {
              if (!nia04f_nodes[i].parentElement.textContent.includes('*')) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              }
            } else {
              nia04f_legend = nia04f_fieldset.getElementsByTagName('legend');
              if (!nia04f_legend || nia04f_legend.length != 1) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              } else if (!nia04f_legend[0].textContent.includes('*')) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              }
            }
          }
        }
      }
      if (nia04f_desc.length == 0) {
        setItemToResultList(
          'nc',
          "<li><span class='result-focus label-red'>04-F</span> : Absence d'indication de la signification de l'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a>]</li>"
        );
      }
    }
    if (nia04f_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia04f' class='result-focus label-red'>04-F</a> : Absence d'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/letiquette-de-chaque-champ-de-formulaire-indique-si-la-saisie-est-obligatoire' target='_blank'>Opquast 69</a>]'</li>"
      );
    }
  }
}

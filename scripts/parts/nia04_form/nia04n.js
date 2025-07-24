// N Le format de saisie du datepicker est indiqué (soit un aria-descibedby, soit des paranthèses dans le label)
function check_test_04n() {
  const nia04n_nodes = document.querySelectorAll(
    "input[type='text'].datepicker:not([aria-describedby]), input[type='text'][pattern='([0-9]{2}-){2}[0-9]{4}']:not([aria-describedby])"
  );
  let nia04n_flag = false;
  let nia04n_label = '',
    nia04n_id = '';
  if (nia04n_nodes && nia04n_nodes.length > 0) {
    for (let i = 0; i < nia04n_nodes.length; i++) {
      if (isItemVisible(nia04n_nodes[i])) {
        nia04n_id = nia04n_nodes[i].getAttribute('id');
        if (!nia04n_id || nia04n_id == '') {
          setItemOutline(nia04n_nodes[i], 'red', 'nia04n', '04-N');
          nia04n_flag = true;
        } else {
          nia04n_label = document.querySelectorAll("[for='" + nia04n_id + "']");
          if (!nia04n_label || nia04n_label.length != 1) {
            setItemOutline(nia04n_nodes[i], 'red', 'nia04n', '04-N');
            nia04j_flag = true;
          } else if (nia04n_label[0].innerText.indexOf('(') < 0) {
            setItemOutline(nia04n_nodes[i], 'red', 'nia04n', '04-N');
            nia04n_flag = true;
          }
        }
      }
    }
  }
  if (nia04n_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04n' class='result-focus label-red'>04-N</a> : Absence du format de saisie dans un datepicker [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>"
    );
  }
}
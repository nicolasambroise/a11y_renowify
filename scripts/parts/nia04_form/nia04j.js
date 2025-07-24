// J Le format de saisie des champs de formulaire qui le nécessitent est indiqué (soit un aria-descibedby, soit des paranthèses dans le label)
function check_test_04j() {
  const nia04j_nodes = document.querySelectorAll(
    "input[type='email']:not([aria-describedby]), input[type='tel']:not([aria-describedby]), input[pattern]:not([aria-describedby]):not([pattern='.*\\\\S.*'])"
  );
  let nia04j_flag = false;
  let nia04j_label = '',
    nia04j_id = '';
  if (nia04j_nodes && nia04j_nodes.length > 0) {
    for (let i = 0; i < nia04j_nodes.length; i++) {
      if (isItemVisible(nia04j_nodes[i])) {
        nia04j_id = nia04j_nodes[i].getAttribute('id');
        if (!nia04j_id || nia04j_id == '') {
          setItemOutline(nia04j_nodes[i], 'red', 'nia04j', '04-J');
          nia04j_flag = true;
        } else {
          nia04j_label = document.querySelectorAll("[for='" + nia04j_id + "']");
          if (!nia04j_label || nia04j_label.length != 1) {
            setItemOutline(nia04j_nodes[i], 'red', 'nia04j', '04-J');
            nia04j_flag = true;
          } else if (nia04j_label[0].innerText.indexOf('(') < 0) {
            setItemOutline(nia04j_nodes[i], 'red', 'nia04j', '04-J');
            nia04j_flag = true;
          }
        }
      }
    }
  }
  if (nia04j_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04j' class='result-focus label-red'>04-J</a> : Absence du format de saisie dans un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>"
    );
  }
}
// I Les informations complétant l'étiquette d'un champ sont associées à celui-ci dans le code source
function check_test_04i() {
  if (!only_redactor) {
    const nia04i_nodes = document.querySelectorAll('input[aria-describedby]');
    let nia04i_flag = false;
    let nia04i_desc = '',
      nia04i_id = '';
    if (nia04i_nodes && nia04i_nodes.length > 0) {
      for (let i = 0; i < nia04i_nodes.length; i++) {
        if (isItemVisible(nia04i_nodes[i])) {
          nia04i_id = nia04i_nodes[i].getAttribute('aria-describedby').trim();
          if (!nia04i_id || nia04i_id == '') {
            setItemOutline(nia04i_nodes[i], 'red', 'nia04i', '04-I');
            nia04i_flag = true;
          } else {
            nia04i_desc = document.querySelectorAll("[id='" + nia04i_id + "']");
            if (!nia04i_desc || nia04i_desc.length != 1) {
              setItemOutline(nia04i_nodes[i], 'red', 'nia04i', '04-I');
              nia04i_flag = true;
            }
          }
        }
      }
    }
    if (nia04i_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia04i' class='result-focus label-red'>04-I</a> : Présence d'attribut aria-describedby non lié à un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-informations-completant-letiquette-dun-champ-sont-associees-a-celui-ci-dans-le-code-source' target='_blank'>Opquast 68</a>]</li>"
      );
    }
  }
}

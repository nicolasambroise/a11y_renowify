// B. Vérifier le format sur l'email
function check_test_04b() {
  const nia04b_nodes = document.querySelectorAll('input[type="email"]');
  let nia04b_flag = false;
  let nia04b_id = '',
    nia04b_desc = '',
    nia04b_label = '',
    nia04b_help = '';
  if (nia04b_nodes && nia04b_nodes.length > 0) {
    for (let i = 0; i < nia04b_nodes.length; i++) {
      (nia04b_id = ''),
        (nia04b_desc = ''),
        (nia04b_label = ''),
        (nia04b_help = '');
      nia04b_id = nia04b_nodes[i].getAttribute('id');
      nia04b_desc = nia04b_nodes[i].getAttribute('aria-describedby');
      if (nia04b_id && nia04b_id != '') {
        nia04b_label = document.querySelector("label[for='" + nia04b_id + "']");
        if (!nia04b_label) {
          setItemOutline(nia04b_nodes[i], 'red', 'nia04b', '04-B');
          nia04b_flag = true;
        }
      }
      if (nia04b_desc && nia04b_desc != '') {
        nia04b_help = document.querySelector('[id=' + nia04b_desc + ']');
        if (!nia04b_help) {
          setItemOutline(nia04b_nodes[i], 'red', 'nia04b', '04-B');
          nia04b_flag = true;
        }
      }
      if (
        (nia04b_label &&
          nia04b_label != '' &&
          nia04b_label.innerText.match(/^\S+@\S+\.\S+$/)) ||
        (nia04b_help &&
          nia04b_help != '' &&
          nia04b_help.innerText.match(/^\S+@\S+\.\S+$/))
      ) {
        setItemOutline(nia04b_nodes[i], 'red', 'nia04b', '04-B');
        nia04b_flag = true;
      }
    }
  }
  if (nia04b_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04b' class='result-focus label-red'>04-B</a> : Présence de champs email sans exemple de format [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-5' target='_blank'>RAWeb 11.10.5</a>]</li>"
    );
  }
}
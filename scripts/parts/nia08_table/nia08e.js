// E. Chaque tableau à un entete de ligne ou de colonne balisé avec th ou role="columnheader" ou role="rowheader"
function check_test_08e() {
  const nia08e_nodes = document.querySelectorAll(
    ':where([role="table"],table:not([role="presentation"]))'
  );
  let nia08e_flag = false;
  let nia08e_html = '';
  if (nia08e_nodes && nia08e_nodes.length > 0) {
    for (let i = 0; i < nia08e_nodes.length; i++) {
      nia08e_html = nia08e_nodes[i].innerHTML;
      if (
        nia08e_html.indexOf('<th') < 0 &&
        nia08e_html.indexOf(' role="columnheader"') < 0 &&
        nia08e_html.indexOf(' role="rowheader"') < 0
      ) {
        if (debug_flag) console.log(nia08e_html);
        setItemOutline(nia08e_nodes[i], 'red', 'nia08e', '08-E');
        nia08e_flag = true;
      }
    }
  }
  if (nia08e_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08e' class='result-focus label-red'>08-E</a> : Présence d'un tableau de données sans en-tête [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-6-1' target='_blank'>RAWeb 5.6.1</a>]</li>"
    );
  }
}
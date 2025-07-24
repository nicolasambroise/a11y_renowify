// G. Pas d'autocomplete sur les champs radio/checkbox
function check_test_04g() {

  const nia04g_nodes = document.querySelectorAll(
    'input[type="checkbox"][autocomplete]:not([autocomplete="off"]),input[type="radio"][autocomplete]:not([autocomplete="off"])'
  );
  if (nia04g_nodes && nia04g_nodes.length > 0 && isItemsVisible(nia04g_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04g' class='result-focus label-red'>04-G</a> : Présence d'autocomplete sur un champ de type 'checkbox' ou 'Radiobutton' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04g_nodes, 'red', 'nia04g', '04-G');
  }
}
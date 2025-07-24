// D. Page title
function check_test_05d() {
  const nia05d_title = document.title;
  if (nia05d_title == '') {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia05d' class='result-focus label-red'>05-D</a> : Vérifier qu'un titre de page est défini [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-5-1' target='_blank'>RAWeb 8.5.1</a>]</li>"
    );
  }
}
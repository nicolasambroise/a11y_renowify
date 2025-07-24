// C. Doctype
function check_test_05c() {
  if (!only_redactor) {
    const nia05c_doctype = new XMLSerializer().serializeToString(
      document.doctype
    );
    if (nia05c_doctype != '<!DOCTYPE html>') {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia05c' class='result-focus label-orange'>05-C</a> : Vérifier qu'un doctype est correctement déclaré [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-1-1' target='_blank'>RAWeb 8.1.1</a>]</li>"
      );
    }
  }
}
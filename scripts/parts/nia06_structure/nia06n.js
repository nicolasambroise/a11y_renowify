// N Composant Sommaire : Bloub
function check_test_06n() {

  if (isAEM && !only_redactor) {
    const nia06n_node = document.querySelector('.page-bloub');
    if (nia06n_node) {
      if (
        nia06n_node.tagName != 'NAV' ||
        !nia06n_node.hasAttribute('role') ||
        nia06n_node.getAttribute('role') != 'navigation' ||
        !nia06n_node.hasAttribute('aria-label')
      ) {
        setItemOutline(nia06n_node, 'orange', 'nia06n1', '06-N');
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06n1' class='result-focus label-orange'>06-N</a> : Le sommaire doit être structuré dans une balise 'nav' avec un role='navigation' et un attribut aria-label</li>"
        );
      }

      const nia06n_links = nia06n_node.querySelectorAll('ul > li > a');
      let nia06n3_count = 0;
      if (nia06n_links && nia06n_links.length > 0) {
        for (let i = 0; i < nia06n_links.length; i++) {
          if (
            nia06n_links[i].hasAttribute('aria-current') &&
            (nia06n_links[i].getAttribute('aria-current') == 'true' ||
              nia06n_links[i].getAttribute('aria-current') == 'step')
          ) {
            nia06n3_count++;
          }
        }
        if (nia06n3_count == 0) {
          setItemsOutline(nia06n_links, 'orange', 'nia06n3', '06-N');
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia06n3' class='result-focus label-orange'>06-N</a> : Dans le sommaire, le lien ancre vers la section en cours de consultation doit être identifié par l’attribut aria_current=’true’ ou 'step' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-9-1' target='_blank'>RAWeb 10.9.1</a>]</li>"
          );
        }
      } else {
        setItemOutline(nia06n_node, 'red', 'nia06n2', '06-N');
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06n2' class='result-focus label-red'>06-N</a> : Le sommaire ne contient pas d'élément de navigation</li>"
        );
      }
    }
  }}
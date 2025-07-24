// L Accordéon
function check_test_06l() {
  if (isAEM && !only_redactor) {
    const nia06l1_nodes = document.querySelectorAll(
      '.cmp-accordion > *:not(details):not(span.checkA11YSpan):not(span.cmp-accordionItem__icon), .cmp-accordion > details > *:not(summary):not(.cmp-accordion__panel), .filters-content > *:not(details), .filters-content > details > *:not(summary):not(.filter-content)'
    );
    if (
      nia06l1_nodes &&
      nia06l1_nodes.length > 0 &&
      isItemsVisible(nia06l1_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06l1' class='result-focus label-orange'>06-L</a> : Présence d'accordéon sans structure details/summary</li>"
      );
      setItemsOutline(nia06l1_nodes, 'orange', 'nia06l1', '06-L');
    }

    const nia06l2_nodes = document.querySelectorAll(
      'details > summary > *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"]):not(svg[aria-hidden="true"]):not(span.checkA11YSpan):not(span.cmp-accordionItem__icon):not(.filter-subtitle)'
    );
    if (
      nia06l2_nodes &&
      nia06l2_nodes.length > 0 &&
      isItemsVisible(nia06l2_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06l2' class='result-focus label-orange'>06-L</a> : Présence d'accordéon avec qqch d'autre qu'une balise Hx dans la balise summary [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8.2.1' target='_blank'>RAWeb 8.2.1</a>]</li>"
      );
      setItemsOutline(nia06l2_nodes, 'orange', 'nia06l2', '06-L');
    }
  }
}
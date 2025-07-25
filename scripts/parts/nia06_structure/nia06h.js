// H. Cadres iframe
function check_test_06h() {
  // H1 Présence de titre
  const nia06h1_nodes = document.querySelectorAll(
    'frame:not([title]),iframe:not([title])'
  );
  if (
    nia06h1_nodes &&
    nia06h1_nodes.length > 0 &&
    isItemsVisible(nia06h1_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia06h1' class='result-focus label-red'>06-H</a> : Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-2-1-1' target='_blank'>RAWeb 2.1.1</a>]</li>"
    );
    setItemsOutline(nia06h1_nodes, 'red', 'nia06h1', '06-H');
  }

  if (!only_redactor) {
    // H2 iframe Has Noresize
    const nia06h2_nodes = document.querySelectorAll('iframe[noresize]');
    if (
      nia06h2_nodes &&
      nia06h2_nodes.length > 0 &&
      isItemsVisible(nia06h2_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06h2' class='result-focus label-red'>06-H</a> : Présence de cadre avec attribut noresize</li>"
      );
      setItemsOutline(nia06h2_nodes, 'red', 'nia06h2', '06-H');
    }

    // H3 iframe Has No Scroll
    const nia06h3_nodes = document.querySelectorAll('iframe[scrolling=no]');
    if (
      nia06h3_nodes &&
      nia06h3_nodes.length > 0 &&
      isItemsVisible(nia06h3_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06h3' class='result-focus label-orange'>06-H</a> : Présence de cadre avec attribut obsolète scrolling=no</li>"
      );
      setItemsOutline(nia06h3_nodes, 'orange', 'nia06h3', '06-H');
    }

    // H4 iframe vide
    const nia06h4_nodes = document.querySelectorAll(
      'iframe:not([src]),iframe[src=""]'
    );
    if (
      nia06h4_nodes &&
      nia06h4_nodes.length > 0 &&
      isItemsVisible(nia06h4_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06h4' class='result-focus label-red'>06-H</a> : Présence de cadre vide</li>"
      );
      setItemsOutline(nia06h4_nodes, 'red', 'nia06h4', '06-H');
    }

    // H5 iframe Width Height
    const nia06h5_nodes = document.querySelectorAll(
      'iframe[width], iframe[height]'
    );
    if (
      nia06h5_nodes &&
      nia06h5_nodes.length > 0 &&
      isItemsVisible(nia06h5_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06h5' class='result-focus label-red'>06-H</a> : Présence de cadre avec attributde présentation (height, width)</li>"
      );
      setItemsOutline(nia06h5_nodes, 'red', 'nia06h5', '06-H');
    }
  }
}

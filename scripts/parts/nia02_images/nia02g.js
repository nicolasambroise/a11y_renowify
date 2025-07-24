// G. Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle
function check_test_02g() {
  const nia02g1_nodes = document.querySelectorAll(
    'img:where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label][aria-labelledby][title])'
  );
  if (
    nia02g1_nodes &&
    nia02g1_nodes.length > 0 &&
    isItemsVisible(nia02g1_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02g1' class='result-focus label-red'>02-G</a> : Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-1' target='_blank'>RAWeb 1.2.1</a>] </li>"
    );
    setItemsOutline(nia02g1_nodes, 'red', 'nia02g1', '02-G');
  }

  if (!only_redactor) {
    const nia02g2_nodes = document.querySelectorAll(
      'area:not([href]):where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label],[aria-labelledby],[title])'
    );
    if (
      nia02g2_nodes &&
      nia02g2_nodes.length > 0 &&
      isItemsVisible(nia02g2_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g2' class='result-focus label-red'>02-G</a> : Les zone non cliquable de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-2' target='_blank'>RAWeb 1.2.2</a>] </li>"
      );
      setItemsOutline(nia02g2_nodes, 'red', 'nia02g2', '02-G');
    }

    const nia02g3_nodes = document.querySelectorAll(
      'object[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])'
    );
    if (
      nia02g3_nodes &&
      nia02g3_nodes.length > 0 &&
      isItemsVisible(nia02g3_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g3' class='result-focus label-red'>02-G</a> : Les images object de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>"
      );
      setItemsOutline(nia02g3_nodes, 'red', 'nia02g3', '02-G');
    }

    const nia02g4_nodes = document.querySelectorAll(
      'canvas[aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])'
    );
    if (
      nia02g4_nodes &&
      nia02g4_nodes.length > 0 &&
      isItemsVisible(nia02g4_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g4' class='result-focus label-red'>02-G</a> : Les images bitmap de décoration (canvas) ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-5' target='_blank'>RAWeb 1.2.5</a>] </li>"
      );
      setItemsOutline(nia02g4_nodes, 'red', 'nia02g4', '02-G');
    }

    const nia02g5_nodes = document.querySelectorAll(
      'embed[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])'
    );
    if (
      nia02g5_nodes &&
      nia02g5_nodes.length > 0 &&
      isItemsVisible(nia02g5_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g4' class='result-focus label-red'>02-G</a> : Les images embarquées de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-6' target='_blank'>RAWeb 1.2.6</a>] </li>"
      );
      setItemsOutline(nia02g5_nodes, 'red', 'nia02g5', '02-G');
    }

    const nia02g6_nodes = document.querySelectorAll(
      'object[type^="image/"][aria-hidden="true"]'
    );
    let nia02g6_flag = false;
    if (nia02g6_nodes && nia02g6_nodes.length > 0) {
      for (let i = 0; i < nia02g6_nodes.length; i++) {
        if (
          isItemVisible(nia02g6_nodes[i]) &&
          nia02g6_nodes[i].textContent.length > 0
        ) {
          setItemOutline(nia02g6_nodes[i], 'red', 'nia02g6', '02-G');
          nia02g6_flag = true;
        }
      }
    }
    if (nia02g6_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g6' class='result-focus label-red'>02-G</a> : Les images object de décoration ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>"
      );
    }

    const nia02g7_nodes = document.querySelectorAll(
      'canvas[aria-hidden="true"]'
    );
    let nia02g7_flag = false;
    if (nia02g7_nodes && nia02g7_nodes.length > 0) {
      for (let i = 0; i < nia02g7_nodes.length; i++) {
        if (
          isItemVisible(nia02g7_nodes[i]) &&
          nia02g7_nodes[i].textContent.length > 0
        ) {
          setItemOutline(nia02g7_nodes[i], 'red', 'nia02g7', '02-G');
          nia02g7_flag = true;
        }
      }
    }
    if (nia02g7_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g7' class='result-focus label-red'>02-G</a> : Les images bitmap de décoration (canvas) ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>"
      );
    }
  }
}
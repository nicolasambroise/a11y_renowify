// F Chaque tableau de donnée complexe possède un Caption()
function check_test_08f() {
  const nia08f_nodes = document.querySelectorAll(
    'table:not([summary]):not([aria-describedby]):not([role="presentation"])'
  );
  let nia08f_flag_data = false;
  let nia08f_flag_complex = false;
  let nia08f_caption = '';
  if (nia08f_nodes && nia08f_nodes.length > 0 && isItemsVisible(nia08f_nodes)) {
    for (let i = 0; i < nia08f_nodes.length; i++) {
      nia08f_caption = nia08f_nodes[i].querySelector(':scope > caption');
      if (nia08f_caption == null || nia08f_caption.textContent == '') {
        if (debug_flag) console.log(nia08f_nodes[i]);
        if (isTableComplex(nia08f_nodes[i])) {
          setItemOutline(nia08f_nodes[i], 'red', 'nia08f1', '08-F');
          nia08f_flag_complex = true;
        } else if (!only_error) {
          setItemOutline(nia08f_nodes[i], 'yellow', 'nia08f2', '08-F');
          nia08f_flag_data = true;
        }
      }
    }
  }
  if (nia08f_flag_complex == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08f1' class='result-focus label-red'>08-F</a> : Présence d'un tableau complexe sans résumé</li>"
    );
  }
  if (nia08f_flag_data == true) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia08f2' class='result-focus label-yellow'>08-F</a> : Présence d'un tableau de données sans résumé</li>"
    );
  }

  /* Tableau complexe : Lorsqu’un tableau de données contient des en-têtes qui ne sont pas répartis uniquement sur la première ligne et/ou la première colonne de la grille ou dont la portée n’est pas valable pour l’ensemble de la colonne ou de la ligne, on parle de tableau de données complexe. Il est alors nécessaire de fournir un « résumé » permettant d’en expliquer sa nature et sa structure afin d’en faciliter la consultation pour des utilisateurs de technologies d’assistance par exemple. */
  function isTableComplex(elem) {
    const th_etrange = elem.querySelectorAll(
      'tbody > tr > *:not(*:first-child)'
    );
    for (let i = 0; i < th_etrange.length; i++) {
      if (th_etrange[i].nodeName == 'TH') {
        return true;
      }
    }
    const th_all = elem.querySelectorAll('tr > th');
    for (let i = 0; i < th_all.length; i++) {
      if (
        th_all[i].hasAttribute('rowSpan') &&
        th_all[i].getAttribute('rowSpan') > 1
      ) {
        return true;
      }
      if (
        th_all[i].hasAttribute('colSpan') &&
        th_all[i].getAttribute('colSpan') > 1
      ) {
        return true;
      }
    }
    return false;
  }
}
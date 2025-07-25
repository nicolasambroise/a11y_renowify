// E. Changement de sens de lecture
function check_test_05e() {
  if (!only_redactor) {
    const nia05e1_nodes = document.querySelectorAll(
      '[dir]:not([dir="rtl"]):not([dir="ltr"])'
    );
    if (
      nia05e1_nodes &&
      nia05e1_nodes.length > 0 &&
      isItemsVisible(nia05e1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia05e1' class='result-focus label-red'>05-E</a> : Vérifier la valeur de définition du sens de lecture [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]</li>"
      );
      setItemsOutline(nia05e1_nodes, 'red', 'nia05e1', '05-E');
    }

    const nia05e2_nodes = document.querySelectorAll('[dir="rtl"]');
    const nia05e2_rtl_isocode = [
      'ar',
      'ara',
      'arc',
      'ae',
      'ave',
      'egy',
      'he',
      'heb',
      'nqo',
      'pal',
      'phn',
      'sam',
      'syc',
      'syr',
      'fa',
      'per',
      'fas',
      'ku',
      'kur',
      'dv',
      'ha',
      'khw',
      'ks',
      'pa',
      'ur',
      'yi'
    ];
    let nia05e2_flag = false;
    let nia05e2_lang;
    if (
      nia05e2_nodes &&
      nia05e2_nodes.length > 0 &&
      isItemsVisible(nia05e2_nodes)
    ) {
      for (let i = 0; i < nia05e2_nodes.length; i++) {
        nia05e2_lang = nia05e2_nodes[i].closest('[lang]').getAttribute('lang');
        if (nia05e2_rtl_isocode.indexOf(nia05e2_lang) < 0) {
          setItemOutline(nia05e2_nodes[i], 'red', 'nia05e2', '05-E');
          nia05e2_flag = true;
        }
      }
    }
    if (nia05e2_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia05e2' class='result-focus label-red'>05-E</a> : Présence d'élément avec un sens de lecture de droite vers la gauche [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]</li>"
      );
    }
  }
}

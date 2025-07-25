// A. Verification de la présence du suffix sur les liens externe
function check_test_03a() {
  if (!only_redactor && !only_error) {
    const nia03a_nodes = document.querySelectorAll(
      'html[lang="fr"] a[target="_blank"]:not([title$="- Nouvelle fenêtre"]):not([title$="- Nouvelle fenêtre (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink), html[lang="fr"] a[title$="- Nouvelle fenêtre"]:not([target="_blank"]), html[lang="en"] a[target="_blank"]:not([title$="- New window"]):not([title$="- New window (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="en"] a[title$="- New window"]:not([target="_blank"]), html[lang="de"] a[target="_blank"]:not([title$="- Neues Fenster"]):not([title$="- Neues Fenster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="de"] a[title$="- Neues Fenster"]:not([target="_blank"]),html[lang="lb"] a[target="_blank"]:not([title$="- Nei Fënster"]):not([title$="- Nei Fënster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="lb"] a[title$="- Nei Fënster"]:not([target="_blank"])'
    );
    let nia03a_flag = false;
    let nia03a_lang;
    let nia03a_title;
    if (nia03a_nodes && nia03a_nodes.length > 0) {
      for (let i = 0; i < nia03a_nodes.length; i++) {
        if (isItemVisible(nia03a_nodes[i])) {
          nia03a_lang = nia03a_nodes[i].closest('[lang]').getAttribute('lang');
          nia03a_title = nia03a_nodes[i].getAttribute('title');
          if (
            !nia03a_title ||
            !(
              (nia03a_title &&
                nia03a_lang == 'en' &&
                nia03a_title.endsWith('- New window')) ||
              (nia03a_title &&
                nia03a_lang == 'fr' &&
                nia03a_title.endsWith('- Nouvelle fenêtre')) ||
              (nia03a_title &&
                nia03a_lang == 'de' &&
                nia03a_title.endsWith('- Neues Fenster')) ||
              (nia03a_title &&
                nia03a_lang == 'lb' &&
                nia03a_title.endsWith('- Nei Fënster'))
            )
          ) {
            setItemOutline(nia03a_nodes[i], 'yellow', 'nia03a', '03-A');
            nia03a_flag = true;
          }
        }
      }
    }
    if (nia03a_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03a' class='result-focus label-yellow'>03-A</a> : Vérifier la présence de suffixe sur les liens externes [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/lutilisateur-est-averti-des-ouvertures-de-nouvelles-fenetres' target='_blank'>Opquast 141</a>]</li>"
      );
    }
  }
}

// Q Composant Tabs
function check_test_06q() {
  if (isAEM) {
    // Utilisation de la structure avec les roles
    if (!only_redactor) {
      const nia06q1_nodes = document.querySelectorAll(
        '.cmp-tabs > *:not([role="tablist"]):not([role="tabpanel"]), .cmp-tabs > [role="tablist"] > *:not([role="tab"])'
      );
      if (!nia06q1_nodes || nia06q1_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06q1' class='result-focus label-orange'>06-Q</a> : Vérifier les attributs role dans le système d'onglet </li>"
        );
        setItemsOutline(nia06q1_nodes, 'orange', 'nia06q1', '06-Q');
      }
    }

    // Vérifier la présence d’un container avec l’attribut role=’tablist’ et ainsi qu’un aria_label ou aria_labelledby
    const nia06q2_nodes = document.querySelectorAll(
      '.cmp-tabs > [role="tablist"]:not([aria-label]):not([aria-labelledby])'
    );
    if (!nia06q2_nodes || nia06q2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06q2' class='result-focus label-orange'>06-Q</a> : Absence d'attribut aria-label sur le système d'onglet (à ajouter dans le cq_dialog) </li>"
      );
      setItemsOutline(nia06q2_nodes, 'orange', 'nia06q2', '06-Q');
    }

    // Chaque item d’onglet sera dans une balise <button> et aura l’attribut role=’tab’ ainsi qu’un attribut aria_controls lié avec l’id de son contenu.
    if (!only_redactor && !only_error) {
      const nia06q3_nodes = document.querySelectorAll(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not(button), .cmp-tabs > [role="tablist"] > [role="tab"]:not([aria-controls])'
      );
      if (!nia06q3_nodes || nia06q3_nodes.length > 0) {
        setItemToResultList(
          'nth',
          "<li><a href='#' data-destination='nia06q3' class='result-focus label-yellow'>06-Q</a> : Structurer idéalement les indicateurs d'onglet dans des éléments bouton avec un attribut role=’tab’ ainsi qu’un attribut aria_controls lié avec l’id de son contenu. </li>"
        );
        setItemsOutline(nia06q3_nodes, 'yellow', 'nia06q3', '06-Q');
      }
    }

    // Chaque item d’onglet actif aura un attribut aria_selected=’true’, sinon il aura la valeur ‘false’ dans le cas contraire
    if (!only_redactor) {
      const nia06q4_nodes = document.querySelectorAll(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not([aria-selected]), .cmp-tabs > [role="tablist"] > [role="tab"][aria-selected=false]:not([tabindex="-1"])'
      );
      if (!nia06q4_nodes || nia06q4_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06q4' class='result-focus label-orange'>06-Q</a> : Chaque item d’onglet actif aura un attribut aria_selected=’true’, sinon il aura la valeur ‘false’ ainsi qu'un attribut tabindex='-1' dans le cas contraire. </li>"
        );
        setItemsOutline(nia06q4_nodes, 'orange', 'nia06q4', '06-Q');
      }
    }

    // Chaque contenu d’onglet sera dans un element possédant les attributs role=’tabpanel’ , tabindex=’0’ et ainsi qu’un aria_labelledby  faisant référence au titre de l’onglet.
    if (!only_redactor) {
      const nia06q5_nodes = document.querySelectorAll(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not([id]), .cmp-tabs > [role="tabpanel"]:not([aria-labelledby]), .cmp-tabs > [role="tabpanel"]:not([tabindex="0"])'
      );
      if (!nia06q5_nodes || nia06q5_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06q5' class='result-focus label-orange'>06-Q</a> : Chaque contenu d’onglet sera dans un element possédant les attributs role=’tabpanel’ , tabindex=’0’ et ainsi qu’un aria_labelledby  faisant référence au titre de l’onglet. </li>"
        );
        setItemsOutline(nia06q5_nodes, 'orange', 'nia06q5', '06-Q');
      }
    }
  }
}

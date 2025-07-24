// G. Vérifier que la zone de pied de page est structurée au moyen d’un élément <footer>.
function check_test_06g() {
  if (!only_redactor && isAEM) {
    const nia06g1_nodes = document.querySelectorAll(
      'footer.page-footer:not([role="contentinfo"])'
    );
    if (
      nia06g1_nodes &&
      nia06g1_nodes.length > 0 &&
      isItemsVisible(nia06g1_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06g1' class='result-focus label-red'>06-G</a> : Présence d'une zone de pied de page sans attribut role</li>"
      );
      setItemsOutline(nia06g1_nodes, 'red', 'nia06g1', '06-G');
    }
  }
  if (!only_redactor && !only_error && isAEM) {
    const nia06g2_nodes = document.querySelector(
      'footer.page-footer[role="contentinfo"]'
    );
    if (nia06g2_nodes == null) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-yellow'>06-G</span> : Il y a un problème avec la structuration du footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    }
  }

  if (!only_redactor && !only_error && isAEM) {
    const nia06g3_nodes = document.querySelectorAll(
      'footer h3, footer [role="heading"][aria-level="3"]'
    );
    if (nia06g3_nodes && nia06g3_nodes.length > 1) {
      for (let i = 0; i < nia06g3_nodes.length; i++) {
        if (nia06g3_nodes[i].closest("footer").querySelector('h2,[role="heading"][aria-level="2"]') == null ) {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia06g3' class='result-focus label-yellow'>06-G</a> : Absence d'un titre principal pour le footer</li>"
          );
          setItemOutline(nia06g3_nodes[i], 'yellow', 'nia06g3', '06-G');
        }
      }
    }
  }

  if (!only_redactor && isAEM) {
    const nia06g4_nodes = document.querySelector(
      'footer a[href$="accessibilite.html"], footer a[href$="barrierefreiheit.html"], footer a[href$="accessibility.html"]'
    );
    if (nia06g4_nodes == null) {
      setItemToResultList(
        'nc',
        "<li><span data-destination='nia06g4' class='result-focus label-red'>06-G</span> : Absence de la déclaration d'accessibilité dans le footer </li>"
      );
    }
    else if(nia06g4_nodes.closest("ul") == null){
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06g5' class='result-focus label-red'>06-G</a> : Les liens du footer doivent être structurés sous forme de liste </li>"
      );
      setItemOutline(nia06g4_nodes, 'red', 'nia06g5', '06-G');
    }
  }
}
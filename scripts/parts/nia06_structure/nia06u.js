// U Composant Localnav
function check_test_06u() {
  // Les différents items sont dans une structure de type liste <ul>
  // La localnav doit être dans une balise <nav role=’navigation’> avec un attribut aria_labelledby qui cible le h2 précèdent ses différents items.

  if (!only_redactor && isAEM) {
    const nia06u1_nodes = document.querySelectorAll(
      'nav.page-localnav:not([role="navigation"])'
    );
    if (nia06u1_nodes && nia06u1_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06u1' class='result-focus label-orange'>06-U</a> : Il manque l'attribut role sur la balise nav du localnav.</li>"
      );
      setItemsOutline(nia06u1_nodes, 'orange', 'nia06u1', '06-U');
    }

    const nia06u2_nodes = document.querySelectorAll(
      'nav.page-localnav:not([aria-labelledby])'
    );
    if (nia06u2_nodes && nia06u2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06u2' class='result-focus label-orange'>06-U</a> : Il manque l'attribut aria-labelledby sur la balise nav du localnav.</li>"
      );
      setItemsOutline(nia06u2_nodes, 'orange', 'nia06u2', '06-U');
    }

    const nia06u3_nodes = document.querySelectorAll(
      'nav.page-localnav[aria-labelledby="localnav-title"] > :is(h2,h3,h4)#localnav-title'
    );
    if (nia06u3_nodes && nia06u3_nodes.length > 1) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06u3' class='result-focus label-red'>06-U</a> : Le composant localnav doit avoir un titre Hn lié avec un couple aria-labelledby-id unique (celui-ci peut être visuellement masqué) </li>"
      );
      setItemsOutline(nia06u3_nodes, 'red', 'nia06u3', '06-U');
    }

    const nia06u4_nodes = document.querySelectorAll('nav.page-localnav');
    let nia06u4_items;
    if (nia06u4_nodes && nia06u4_nodes.length > 0) {
      for (let i = 0; i < nia06u4_nodes.length; i++) {
        nia06u4_items = nia06u4_nodes[i].querySelectorAll('ul li.nav-item');
        if (!nia06u4_items || nia06u4_items.length == 0) {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia06u4' class='result-focus label-red'>06-U</a> : Le composant localnav doit contenir des items.</li>"
          );
          setItemOutline(nia06u4_nodes[i], 'red', 'nia06u4', '06-U');
        } else if (nia06u4_items && nia06u4_items.length == 1 && !only_error) {
          setItemToResultList(
            'nth',
            "<li><a href='#' data-destination='nia06u5' class='result-focus label-yellow'>06-U</a> : Le composant localnav doit idéalement contenir plusieurs items.</li>"
          );
          setItemOutline(nia06u4_nodes[i], 'yellow', 'nia06u5', '06-U');
        }
      }
    }
  }
}

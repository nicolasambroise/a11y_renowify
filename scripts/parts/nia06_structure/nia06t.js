// T Composant Panier (Cart)
function check_test_06t() {
  if (!only_redactor && !isHomepage && isAEM && currentUrl.includes('/cart.html')) {
    // Le nom de l’étape en cours est présent dans le titre de la page.
    const nia06t1_title = document.title;
    const nia06t1_h2 = document.querySelector(
      '.basket h2'
    );
    if (!nia06t1_h2 || !nia06t1_title.includes(nia06t1_h2.textContent)) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06t1' class='result-focus label-red'>06-T</a> : Le titre de la page doit reprendre le titre de l'étape du panier.</li>"
      );
      setItemOutline(nia06t1_h2, 'red', 'nia06t1', '06-T');
    }

    // Etape « Votre panier » : Les différentes meta doivent être présentées sous forme de liste (<ul> ou <dl>)
    const nia06t2_nodes = document.querySelector(
      '.basket-order-item-metas'
    );
    if (nia06t2_nodes && nia06t2_nodes.nodeName != "UL" && nia06t2_nodes.nodeName != "DL" ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06t2' class='result-focus label-orange'>06-T</a> : Les différentes meta doivent être présentées sous forme de liste (<ul> ou <dl>)</li>"
      );
      setItemsOutline(nia06t2_nodes, 'orange', 'nia06t2', '06-T');
    }

    // Etape « Votre panier » : Liste de selection pour la quantité doit être liée au titre de la publication
    const nia06t3_nodes = document.querySelector(
      '.basket-order-item-actions select.basket-order-item-qty'
    );
    if (nia06t3_nodes && (nia06t3_nodes.previousElementSibling.nodeName != "LABEL" || !nia06t3_nodes.hasAttribute("aria-describedby"))) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06t3' class='result-focus label-orange'>06-T</a> : Liste de selection pour la quantité doit être liée au titre de la publication</li>"
      );
      setItemsOutline(nia06t3_nodes, 'orange', 'nia06t3', '06-T');
    }

    // Etape « Mode de livraison » Un bouton radio ne devrait pas être seul
    const nia06t4_nodes = document.querySelector(
      '.basket input[type="radio"]'
    );
    if (nia06t4_nodes && nia06t4_nodes.closest('fieldset, [role="group"]') == "null") {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06t4' class='result-focus label-orange'>06-T</a> : Présence d'un bouton radio hors d'une balise fieldset</li>"
      );
      setItemsOutline(nia06t4_nodes, 'orange', 'nia06t4', '06-T');
    }
    else{
      const nia06t5_nodes = nia06t4_nodes.closest('fieldset, [role="group"]').querySelector(
        'input[type="radio"]'
      )
      if (nia06t5_nodes && nia06t5_nodes.length < 2) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06t5' class='result-focus label-orange'>06-T</a> : Un bouton radio ne devrait pas être seul</li>"
        );
        setItemsOutline(nia06t4_nodes, 'orange', 'nia06t5', '06-T');
      }
    }

  }
}
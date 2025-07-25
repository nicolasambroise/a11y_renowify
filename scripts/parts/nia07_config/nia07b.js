// B. Recherche
function check_test_07b() {
  // Presence de l'aria label
  const nia07b1_nodes = document.querySelectorAll(
    'role[search]:not([aria-label])'
  );
  if (
    nia07b1_nodes &&
    nia07b1_nodes.length > 0 &&
    isItemsVisible(nia07b1_nodes)
  ) {
    setItemToResultList(
      'dev',
      "<li><a href='#' data-destination='nia07b1' class='result-focus label-orange'>07-B</a> : Aria-label absent de la recherche</li>"
    );
    setItemsOutline(nia07b1_nodes, 'orange', 'nia07b1', '07-B');
  }

  // Placeholder différent du titre
  const nia07b2_nodes = document.querySelectorAll('input[type="search"]');
  let nia07b2_flag = false;
  if (
    nia07b2_nodes &&
    nia07b2_nodes.length > 0 &&
    isItemsVisible(nia07b2_nodes)
  ) {
    for (let i = 0; i < nia07b2_nodes.length; i++) {
      if (
        nia07b2_nodes[i].hasAttribute('placeholder') &&
        nia07b2_nodes[i].hasAttribute('title') &&
        nia07b2_nodes[i].getAttribute('placeholder') !=
          nia07b2_nodes[i].getAttribute('title')
      ) {
        nia07b2_flag = true;
        setItemOutline(nia07b2_nodes[i], 'red', 'nia07b2', '07-B');
      }
    }
  }
  if (nia07b2_flag == true) {
    setItemToResultList(
      'dev',
      "<li><a href='#' data-destination='nia07b2' class='result-focus label-red'>07-B</a> : Problème avec le placeholder de la recherche</li>"
    );
  }

  // Titre de recherche trop court
  const nia07b3_nodes = document.querySelectorAll('input[type="search"]');
  let nia07b3_flag = false;
  if (
    nia07b3_nodes &&
    nia07b3_nodes.length > 0 &&
    isItemsVisible(nia07b3_nodes)
  ) {
    for (let i = 0; i < nia07b3_nodes.length; i++) {
      // Rechercher / Recherche / Suchen / Search --> Concidéré comme pas assez précis.
      if (
        nia07b3_nodes[i].hasAttribute('title') &&
        nia07b3_nodes[i].getAttribute('title').length < 15
      ) {
        nia07b3_flag = true;
        setItemOutline(nia07b3_nodes[i], 'orange', 'nia07b3', '07-B');
      }
    }
  }
  if (nia07b3_flag == true) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia07b3' class='result-focus label-orange'>07-B</a> : Problème avec la pertinence du titre de la recherche</li>"
    );
  }

  // Role search sur les recherches secondaires
  if (!only_redactor && !only_error && isAEM) {
    const nia07b4_nodes = document.querySelectorAll(
      'main form[role="search"]:not([action$="recherche.html"]):not([aria-label="Globale"]):not([aria-label="Global"])'
    );
    if (
      nia07b4_nodes &&
      nia07b4_nodes.length > 0 &&
      isItemsVisible(nia07b4_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b4' class='result-focus label-yellow'>07-B</a> : Présence d'un role=search sur les éléments de recherche secondaire</li>"
      );
      setItemsOutline(nia07b4_nodes, 'yellow', 'nia07b4', '07-B');
    }
  }

  // Les filtres sont présentés avec une structure en accordéon details/summary
  if (!only_redactor && !only_error && isAEM) {
    const nia07b5_nodes = document.querySelectorAll(
      '.filters-content > *:not(details)'
    );
    if (
      nia07b5_nodes &&
      nia07b5_nodes.length > 0 &&
      isItemsVisible(nia07b5_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b5' class='result-focus label-yellow'>07-B</a> : Il est recommander de présenter les filtres avec une structure en accordéon details/summary</li>"
      );
      setItemsOutline(nia07b5_nodes, 'yellow', 'nia07b5', '07-B');
    }
  }

  //Affichage du nombre de résultat
  if (!only_redactor && isAEM) {
    const nia07b6_nodes = document.querySelectorAll('.search-meta-count');
    if (
      nia07b6_nodes &&
      nia07b6_nodes.length > 0 &&
      !isItemsVisible(nia07b6_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b6' class='result-focus label-orange'>07-B</a> : Absence du nombre de resultat de la recherche</li>"
      );
      setItemsOutline(nia07b6_nodes, 'orange', 'nia07b6', '07-B');
    }
  }

  // Les résultats sont présentés sous forme d’une suite de balise <article> ou <li>
  if (!only_redactor && !only_error && isAEM) {
    const nia07b7_nodes = document.querySelectorAll(
      '.search-results .search-result > *:not(article):not(li)'
    );
    if (
      nia07b7_nodes &&
      nia07b7_nodes.length > 0 &&
      isItemsVisible(nia07b7_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b7' class='result-focus label-yellow'>07-B</a> : Les résultats doivent être présentés sous forme d’une suite de balise 'article' ou 'li'</li>"
      );
      setItemsOutline(nia07b7_nodes, 'yellow', 'nia07b7', '07-B');
    }
  }

  // La pagination doit être structurée dans un élément <nav role=‘navigation’> avec un aria_label
  if (!only_redactor) {
    const nia07b8_nodes = document.querySelectorAll(
      'nav:not([role="navigation"]) > :is(ol,ul).pagination, *:not(nav) > :is(ol,ul).pagination, nav:not([aria-label]) > :is(ol,ul).pagination'
    );
    if (
      nia07b8_nodes &&
      nia07b8_nodes.length > 0 &&
      isItemsVisible(nia07b8_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b8' class='result-focus label-red'>07-B</a> : La pagination doit être structurée dans un élément 'nav'  avec le role=navigation et un aria_label</li>"
      );
      setItemsOutline(nia07b8_nodes, 'red', 'nia07b8', '07-B');
    }
  }

  //Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)
  if (!only_redactor) {
    const nia07b9_nodes = document.querySelectorAll(
      'nav > .pagination:not(ol,ul)'
    );
    if (
      nia07b9_nodes &&
      nia07b9_nodes.length > 0 &&
      isItemsVisible(nia07b9_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b9' class='result-focus label-red'>07-B</a> : Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)</li>"
      );
      setItemsOutline(nia07b9_nodes, 'red', 'nia07b9', '07-B');
    }
  }

  // La page active doit avoir un aria_current='page'
  if (!only_redactor && isAEM) {
    const nia07b10_nodes = document.querySelectorAll(
      '.pagination .pagination-page'
    );
    let nia07b10_flag = false;
    let nia07b11_counter = 0;
    if (
      nia07b10_nodes &&
      nia07b10_nodes.length > 0 &&
      isItemsVisible(nia07b10_nodes)
    ) {
      for (let i = 0; i < nia07b10_nodes.length; i++) {
        if (nia07b10_nodes[i].tagName != 'LI') {
          setItemsOutline(nia07b10_nodes, 'red', 'nia07b10', '07-B');
          nia07b10_flag = true;
        } else if (
          !nia07b10_nodes[i].firstElementChild ||
          (nia07b10_nodes[i].firstElementChild.tagName == 'A' &&
            (!nia07b10_nodes[i].firstElementChild.hasAttribute('aria-label') ||
              nia07b10_nodes[i].firstElementChild.getAttribute('aria-label')
                .length < 4))
        ) {
          setItemsOutline(nia07b10_nodes, 'red', 'nia07b10', '07-B');
          nia07b10_flag = true;
        }
        if (
          nia07b10_nodes[i].hasAttribute('aria-current') &&
          nia07b10_nodes[i].getAttribute('aria-current') == 'page'
        ) {
          nia07b11_counter++;
        }
      }

      if (nia07b10_flag == true) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07b10' class='result-focus label-red'>07-B</a> : Les item de la pagination doivent être dans une balise li et leur enfant posseder un aria-label pertinent</li>"
        );
      }
      if (nia07b11_counter == 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07b11' class='result-focus label-red'>07-B</a> : La page active de la pagination doit avoir un aria_current= ‘page’</li>"
        );
        setItemsOutline(nia07b10_nodes, 'red', 'nia07b11', '07-B');
      }
    }
  }
}

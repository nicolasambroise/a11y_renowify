// S Breadcrumb
function check_test_06s() {

  // Les pages secondaires doivent disposer d’un breadcrumb
  //L’intégralité de la hiérarchie doit pouvoir être affiché (possibilité de les mettre dans un accordéon) et cliquable.
  // Les liens du breadcrumb doivent être présenté dans une liste ul/ol
  // Un attribut lang doit être ajouté pour les pages (ou les titres de pages) qui ne sont pas dans la langue de la page actuelle.
  // Présence de l'attribut aria_current=’page’ sur le dernier item du fils d'ariane
  // Le breadcrumb doit être dans une balise <nav role=navigation> avec l’attribut aria_label pertinent : "Vous êtes ici" ("Fil d'Ariane" est considéré comme un terme technique).

  if (!only_redactor && !isHomepage && isAEM) {
    const nia06s1_nodes = document.querySelectorAll(
      'nav[id^=breadcrumb-], nav.cmp-breadcrumb'
    );
    if (
      !nia06s1_nodes ||
      nia06s1_nodes.length == 0 ||
      !isItemsVisible(nia06s1_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06s1' class='result-focus label-orange'>06-S</a> : Les pages secondaires doivent disposer d’un breadcrumb.</li>"
      );
      setItemsOutline(nia06s1_nodes, 'orange', 'nia06s1', '06-S');
    } else {
      const nia06s2_nodes = document.querySelectorAll(
        ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([role="navigation"])'
      );
      if (nia06s2_nodes && nia06s2_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06s2' class='result-focus label-orange'>06-S</a> : Il manque l'attribut role sur la balise nav du breadcrumb.</li>"
        );
        setItemsOutline(nia06s2_nodes, 'orange', 'nia06s2', '06-S');
      }

      const nia06s3_nodes = document.querySelectorAll(
        ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([aria-label])'
      );
      if (nia06s3_nodes && nia06s3_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06s3' class='result-focus label-orange'>06-S</a> : Il manque l'attribut aria-label sur la balise nav du breadcrumb.</li>"
        );
        setItemsOutline(nia06s3_nodes, 'orange', 'nia06s3', '06-S');
      }

      const nia06s4_nodes = document.querySelectorAll(
        ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) :is(ul,ol).cmp-breadcrumb__list > li.cmp-breadcrumb__item'
      );
      if (!nia06s4_nodes || nia06s4_nodes.length == 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06s3' class='result-focus label-red'>06-S</a> : Les liens du breadcrumb doivent être présenté dans une liste ul/ol.</li>"
        );
        setItemsOutline(nia06s4_nodes, 'red', 'nia06s4', '06-S');
      }

      const nia06s5_nodes = document.querySelectorAll(
        ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child > span:not([aria-current="page"])'
      );
      if (
        nia06s5_nodes &&
        nia06s5_nodes.length > 0 &&
        isItemsVisible(nia06s5_nodes)
      ) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06s5' class='result-focus label-red'>06-S</a> : Absence de l'attribut aria-current sur le dernier item du fils d'ariane --> Vérifier dans les propriétés de la page que celle-ci n'est pas cachée dans la navigation.</li>"
        );
        setItemsOutline(nia06s5_nodes, 'red', 'nia06s5', '06-S');
      }
    }
  }
}
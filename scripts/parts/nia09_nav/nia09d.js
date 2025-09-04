// D. Présence de 2 systemes de navigation (plan du site, recherche, menu)
function check_test_09d() {
  if (isAEM && !isOnePage) {
    // Menu principal
    const nia09d_nav = document.querySelector(
      'nav #headernav, nav#headernav, *:not(#headerwrapper-mobile) > nav[class^="page-headernav"]:not(.page-headernavmobile)'
    );
    const nia09d_nav_fixed = document.querySelector(
      '.header-icons > nav.headernav-fixed'
    );
    const nia09d_nav_btn = document.querySelector(
      '[class^="page-headernav"] button.anchor[data-destination^="#headernav"]'
    );

    // Recherche
    const nia09d_search = document.querySelector(
      '*:not(#headerwrapper-mobile) > div.topsearch[role="search"]:not(:has(button.anchor)), div.topsearch-desk[role="search"], div.topsearch-desktop[role="search"]'
    );
    const nia09d_search_fixed = document.querySelector(
      '.header-icons > div.topsearch[role="search"]'
    );
    const nia09d_search_btn = document.querySelector(
      'div.topsearch[role="search"] button.anchor'
    );

    // Plan du site
    const nia09d_plan = document.querySelector(
      'footer .page-footernav ul > li.nav-item a[href*="plan"][href$=".html"]'
    );
    const nia09d_footer_links = document.querySelectorAll(
      'footer .nav-item > a:not([target="_blank"])'
    );

    let nia09d_counter = 0;
    if (nia09d_nav && isItemVisible(nia09d_nav)) {
      nia09d_counter++;
    } else if (nia09d_nav_btn && isItemVisible(nia09d_nav_btn)) {
      nia09d_counter++;
    } else if (
      nia09d_nav &&
      nia09d_nav_fixed &&
      isItemVisible(nia09d_nav_fixed)
    ) {
      nia09d_counter++;
    } else if (debug_flag) {
      console.log('navigation principale non trouvé');


      console.log(nia09d_nav_btn)
      console.log(window.getComputedStyle(nia09d_nav_btn))
      console.log(isItemVisible(nia09d_nav_btn))
    }

    if (nia09d_search && isItemVisible(nia09d_search)) {
      nia09d_counter++;
    } else if (
      nia09d_search &&
      nia09d_search_btn &&
      isItemVisible(nia09d_search_btn)
    ) {
      nia09d_counter++;
    } else if (
      nia09d_search &&
      nia09d_search_fixed &&
      isItemVisible(nia09d_search_fixed)
    ) {
      nia09d_counter++;
    } else if (debug_flag) {
      console.log('recherche non trouvée');
    }

    if (nia09d_plan && isItemVisible(nia09d_plan)) {
      nia09d_counter++;
    } else if (debug_flag) {
      console.log('plan du site non trouvé');
    }
    if (nia09d_counter < 2) {
      if (nia09d_footer_links && nia09d_footer_links.length <= 3) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><span class='result-focus label-yellow'>09-D</span> : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]</li>"
          );
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><span class='result-focus label-red'>09-D</span> : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]</li>"
        );
      }
    }
  }
}

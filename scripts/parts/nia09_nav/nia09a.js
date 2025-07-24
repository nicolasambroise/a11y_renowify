// A Pertinence du plan du site
function check_test_09a() {
  if (isSitemap && isAEM) {
    const nia09a1_footer = document.querySelectorAll(
      '.page-footernav a[href*="contact"][href$=".html"]'
    );
    const nia09a2_footer = document.querySelectorAll(
      '.page-footernav a[href*="accessibilite"][href$=".html"]'
    );
    const nia09a3_footer = document.querySelectorAll(
      '.page-footernav a[href*="aspects-legaux"][href$=".html"]'
    );
    const nia09a4_footer = document.querySelectorAll(
      '.page-footernav a[href*="a-propos"][href$=".html"]'
    );

    const nia09a1_sitemap = document.querySelectorAll(
      '.cmp-sitemap a[href*="contact"][href$=".html"]'
    );
    const nia09a2_sitemap = document.querySelectorAll(
      '.cmp-sitemap a[href*="accessibilite"][href$=".html"]'
    );
    const nia09a3_sitemap = document.querySelectorAll(
      '.cmp-sitemap a[href*="aspects-legaux"][href$=".html"]'
    );
    const nia09a4_sitemap = document.querySelectorAll(
      '.cmp-sitemap a[href*="a-propos"][href$=".html"]'
    );

    const nia09a5_support = document.querySelectorAll(
      '.cmp-sitemap a[href$="support.html"]'
    );

    // Erreur si le lien existe dans le footer mais pas dans la map ou inversement

    if (
      nia09a1_footer &&
      nia09a1_footer.length > 0 &&
      (!nia09a1_sitemap || nia09a1_sitemap.length == 0)
    ) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><a href='#' data-destination='nia09a1' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page contact dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a1_footer, 'yellow', 'nia09a1', '09-A');
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a1_footer, 'red', 'nia09a1', '09-A');
      }
    } else if (
      nia09a1_sitemap &&
      nia09a1_sitemap.length > 0 &&
      (!nia09a1_footer || nia09a1_footer.length == 0)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a1_sitemap, 'red', 'nia09a1', '09-A');
    }

    if (
      nia09a2_footer &&
      nia09a2_footer.length > 0 &&
      (!nia09a2_sitemap || nia09a2_sitemap.length == 0)
    ) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><a href='#' data-destination='nia09a2' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page Accessibilté dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a2_footer, 'yellow', 'nia09a2', '09-A');
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a2_footer, 'red', 'nia09a2', '09-A');
      }
    } else if (
      nia09a2_sitemap &&
      nia09a2_sitemap.length > 0 &&
      (!nia09a2_footer || nia09a2_footer.length == 0)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a2_sitemap, 'red', 'nia09a2', '09-A');
    }

    if (
      nia09a3_footer &&
      nia09a3_footer.length > 0 &&
      (!nia09a3_sitemap || nia09a3_sitemap.length == 0)
    ) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><a href='#' data-destination='nia09a3' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page Aspect légaux dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a3_footer, 'yellow', 'nia09a3', '09-A');
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a3_footer, 'red', 'nia09a3', '09-A');
      }
    } else if (
      nia09a3_sitemap &&
      nia09a3_sitemap.length > 0 &&
      (!nia09a3_footer || nia09a3_footer.length == 0)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a3_sitemap, 'red', 'nia09a3', '09-A');
    }

    if (
      nia09a4_footer &&
      nia09a4_footer.length > 0 &&
      (!nia09a4_sitemap || nia09a4_sitemap.length == 0)
    ) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><a href='#' data-destination='nia09a4' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page A propos dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a4_footer, 'yellow', 'nia09a4', '09-A');
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a4_footer, 'red', 'nia09a4', '09-A');
      }
    } else if (
      nia09a4_sitemap &&
      nia09a4_sitemap.length > 0 &&
      (!nia09a4_footer || nia09a4_footer.length == 0)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a4_sitemap, 'red', 'nia09a4', '09-A');
    }
  }
}
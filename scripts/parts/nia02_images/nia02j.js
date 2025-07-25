// J.Les vignettes et aperçus ne sont pas des images de taille supérieure redimensionnées côté client.
function check_test_02j() {
  if (!only_error && isAEM) {
    const nia02j_nodes = document.querySelectorAll(
      '*:not(.feed-item-content > p):not(.feed-item-header):not(.ol-full-screen-false) > img:not([src$=".svg"])'
    );
    let nia02j_css_h = '',
      nia02j_css_w = '',
      nia02j_html_h = '',
      nia02j_html_w = '',
      nia02j_natural_h = '',
      nia02j_natural_w = '';
    let nia02j_flag = false;
    let nia02j_ratio_max = 3.5;
    let nia02j_ratio_min = 0.5;
    if (nia02j_nodes && nia02j_nodes.length > 0) {
      for (let i = 0; i < nia02j_nodes.length; i++) {
        if (isItemVisible(nia02j_nodes[i])) {
          nia02j_ratio_max = 3.5;
          if (
            Boolean(nia02j_nodes[i].closest('.search-result')) ||
            Boolean(nia02j_nodes[i].closest('.cmp-focus'))
          ) {
            nia02j_ratio_max = 5;
            if (debug_flag)
              console.log(
                nia02j_ratio_max + ' ' + nia02j_nodes[i].getAttribute('src')
              );
          } // ratio 5 pour search-result  3.5 sinon

          nia02j_css_h = nia02j_nodes[i].height;
          nia02j_css_w = nia02j_nodes[i].width;
          nia02j_html_h = nia02j_nodes[i].getAttribute('height');
          nia02j_html_w = nia02j_nodes[i].getAttribute('width');
          nia02j_natural_h = nia02j_nodes[i].naturalHeight;
          nia02j_natural_w = nia02j_nodes[i].naturalWidth;

          if (
            nia02j_html_h &&
            (Math.abs(nia02j_html_h / nia02j_css_h) < nia02j_ratio_min ||
              Math.abs(nia02j_html_h / nia02j_css_h) > nia02j_ratio_max)
          ) {
            if (debug_flag)
              console.log(
                'Html Height : ' + nia02j_html_h + ' vs ' + nia02j_css_h
              );
            setItemOutline(nia02j_nodes[i], 'yellow', 'nia02j', '02-J');
            nia02j_flag = true;
          } else if (
            nia02j_html_w &&
            (Math.abs(nia02j_html_w / nia02j_css_w) < nia02j_ratio_min ||
              Math.abs(nia02j_html_w / nia02j_css_w) > nia02j_ratio_max)
          ) {
            if (debug_flag)
              console.log(
                'Html Width : ' + nia02j_html_w + ' vs ' + nia02j_css_w
              );
            setItemOutline(nia02j_nodes[i], 'yellow', 'nia02j', '02-J');
            nia02j_flag = true;
          } else if (
            (Math.abs(nia02j_natural_h / nia02j_css_h) < nia02j_ratio_min ||
              Math.abs(nia02j_natural_h / nia02j_css_h) > nia02j_ratio_max) &&
            nia02j_natural_h > 1
          ) {
            if (debug_flag)
              console.log(
                'Natural Height : ' + nia02j_natural_h + ' vs ' + nia02j_css_h
              );
            setItemOutline(nia02j_nodes[i], 'yellow', 'nia02j', '02-J');
            nia02j_flag = true;
          } else if (
            (Math.abs(nia02j_natural_w / nia02j_css_w) < nia02j_ratio_min ||
              Math.abs(nia02j_natural_w / nia02j_css_w) > nia02j_ratio_max) &&
            nia02j_natural_w > 1
          ) {
            if (debug_flag)
              console.log(
                'Natural Width : ' + nia02j_natural_w + ' vs ' + nia02j_css_w
              );
            setItemOutline(nia02j_nodes[i], 'yellow', 'nia02j', '02-J');
            nia02j_flag = true;
          }
        }
      }
    }
    if (nia02j_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia02j' class='result-focus label-yellow'>02-J</a> : Présence d'image redimentionnées côté Client [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-vignettes-et-apercus-ne-sont-pas-des-images-de-taille-superieure-redimensionnees-cote-client' target='_blank'>Opquast 114</a>]</li>"
      );
    }
  }
}

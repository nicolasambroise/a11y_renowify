/* C. Anchor */
function check_test_12c() {
  if (isAEM) {
    const nia12c_nodes = document.querySelectorAll(
      '.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)'
    );
    let nia12c_title = '',
      nia12c_content = '',
      nia12c_lang = '',
      nia12c_label = '';
    let nia12c1_flag = false,
      nia12c2_flag = false,
      nia12c3_flag = false;
    if (nia12c_nodes && nia12c_nodes.length > 0) {
      if (nia12c_nodes && nia12c_nodes.length > 0) {
        for (let i = 0; i < nia12c_nodes.length; i++) {
          nia12c_lang = nia12c_nodes[i].closest('[lang]').getAttribute('lang');
          if (nia12c_nodes[i].hasAttribute('title'))
            nia12c_title = sanitizeText(
              nia12c_nodes[i].getAttribute('title'),
              nia12c_lang
            );
          if (nia12c_nodes[i].hasAttribute('aria-label'))
            nia12c_label = sanitizeText(
              nia12c_nodes[i].getAttribute('aria-label'),
              nia12c_lang
            );
          nia12c_content = sanitizeText(
            nia12c_nodes[i].innerText != ''
              ? nia12c_nodes[i].innerText
              : nia12c_nodes[i].textContent,
            nia12c_lang
          );
          if (
            nia12c_nodes[i].hasAttribute('title') &&
            !nia12c_title.includes(nia12c_content)
          ) {
            if (debug_flag)
              console.log(
                '%cERROR',
                'font-weight:700;color:darkred',
                '[' + nia12c_title + '] VS [' + nia12c_content + '] '
              );
            setItemOutline(nia12c_nodes[i], 'red', 'nia12c1', '12-C');
            nia12c1_flag = true;
          }
          if (
            nia12c_nodes[i].hasAttribute('title') &&
            nia12c_nodes[i].hasAttribute('aria-label') &&
            nia12c_label != nia12c_title
          ) {
            setItemOutline(nia12c_nodes[i], 'red', 'nia12c2', '12-C');
            nia12c2_flag = true;
          }
          if (
            nia12c_nodes[i].hasAttribute('title') &&
            !nia12c_nodes[i].hasAttribute('aria-label') &&
            nia12c_title != nia12c_content &&
            !only_redactor &&
            !only_error
          ) {
            setItemOutline(nia12c_nodes[i], 'yellow', 'nia12c3', '12-C');
            nia12c3_flag = true;
          }
        }
      }
    }
    if (nia12c1_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia12c1' class='result-focus label-red'>12-C</a> : L'attribut title d'un bouton du site ne reprend pas son contenu textuel</li>"
      );
    }
    if (nia12c2_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia12c2' class='result-focus label-red'>12-C</a> : L'attribut title d'un bouton du site n'est pas identique à son aria-label </li>"
      );
    }
    if (nia12c3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia12c3' class='result-focus label-yellow'>12-C</a> : L'attribut title d'un bouton du site, différent de son contenu textuel, n'est pas completé par un attribut aria-label </li>"
      );
    }
  }
}

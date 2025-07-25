// G Structure globale du menu
function check_test_07g() {
  if (!only_redactor && isAEM) {
    const nia07g1_nodes = document.querySelectorAll(
      'nav#headernav .nav--primary:not(ul), nav#headernav ul.nav--primary > .nav-item:not(li), nav#headernav ul.nav--primary > li.nav-item.has-subnav .subnav-item:not(li)'
    );
    if (nia07g1_nodes && nia07g1_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g1' class='result-focus label-red'>07-G</a> : Les items du menu et du sous menu sont sous forme de liste ul/li</li>"
      );
      setItemsOutline(nia07g1_nodes, 'red', 'nia07g1', '07-G');
    }

    const nia07g2_nodes = document.querySelectorAll(
      'nav#headernav :is(a,button)'
    );
    let nia07g2_flag = false;
    if (nia07g2_nodes && nia07g2_nodes.length > 0) {
      for (let i = 0; i < nia07g2_nodes.length; i++) {
        if (
          !nia07g2_nodes[i].textContent ||
          nia07g2_nodes[i].textContent == ''
        ) {
          nia07g2_flag = true;
          setItemsOutline(nia07g2_nodes, 'red', 'nia07g2', '07-G');
        }
      }
    }
    if (nia07g2_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g2' class='result-focus label-red'>07-G</a> : Les éléments du menu et des sous_menus doivent avoir un intitulé </li>"
      );
    }

    const nia07g3_nodes = document.querySelectorAll('nav#headernav li a');
    let nia07g3_items;
    let nia07g3_flag = false;
    let nia07g4_flag = false;
    let nia07g5_counter = 0;
    if (nia07g3_nodes && nia07g3_nodes.length > 0) {
      for (let i = 0; i < nia07g3_nodes.length; i++) {
        if (nia07g3_nodes[i].hasAttribute('aria-current')) {
          if (nia07g3_nodes[i].getAttribute('aria-current') == 'page') {
            nia07g5_counter++;
            if (
              nia07g3_nodes[i].parentElement.classList.contains('subnav-item')
            ) {
              if (
                !nia07g3_nodes[i].parentElement.closest('has-subnav') ||
                !nia07g3_nodes[i].parentElement
                  .closest('has-subnav')
                  .firstElementChild.hasAttribute('aria-current') ||
                nia07g3_nodes[i].parentElement
                  .closest('has-subnav')
                  .firstElementChild.getAttribute('aria-current') != 'true'
              ) {
                if (debug_flag == true) {
                  console.log(
                    !nia07g3_nodes[i].parentElement.closest('has-subnav')
                  );
                  console.log(
                    !nia07g3_nodes[i].parentElement
                      .closest('has-subnav')
                      .firstElementChild.hasAttribute('aria-current')
                  );
                  console.log(
                    nia07g3_nodes[i].parentElement
                      .closest('has-subnav')
                      .firstElementChild.getAttribute('aria-current') != 'true'
                  );
                }
                nia07g3_flag = true;
                setItemOutline(nia07g3_nodes[i], 'red', 'nia07g3', '07-G');
              }
            }
          } else if (
            nia07g3_nodes[i].getAttribute('aria-current') == 'true' &&
            nia07g3_nodes[i].parentElement.classList.contains('has-subnav')
          ) {
            nia07g3_items = nia07g3_nodes[i].parentElement.querySelectorAll(
              '.subnav-item > a[aria-current="page"], .subnav-item > a[aria-current="true"]'
            );
            //console.log(nia07g3_items);
            if (!nia07g3_items || nia07g3_items.length != 1) {
              nia07g4_flag = true;
              setItemOutline(nia07g3_nodes[i], 'red', 'nia07g4', '07-G');
            }
          }
        }
      }
    }

    if (nia07g3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g3' class='result-focus label-red'>07-G</a> : Les pages parentes de la page courante doivent avoir un attribut aria_current= 'true' </li>"
      );
    }
    if (nia07g4_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g4' class='result-focus label-red'>07-G</a> : Une des pages enfant d'un menu actif doit avoir un attribut aria_current= 'page' </li>"
      );
    }
    if (nia07g5_counter > 1) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g5' class='result-focus label-red'>07-G</a> : Il ne peut y avoir qu'un seul élément dans le menu avec l'attribut aria-current=page </li>"
      );
      setItemOutline(nia07g3_nodes[0].parentElement, 'red', 'nia07g5', '07-G');
    }
  } else if (!only_error) {
    setItemToResultList(
      'man',
      "<li><span class='result-focus label-gray'>07-F</span> : Absence de barre de navigation</li>"
    );
  }
}

// O Composant Focus
function check_test_06o() {
  // Le composant focus doit avoir un titre même si celui_ci est visuellement masqué (.at ou .sr_only). Ce titre de composant doit être d’ 1 niveau supérieur à celui des titres des items
  // Les items du focus doivent être dans une seule et même liste <ul>
  // Le premier élément informatif dans le DOM de chaque item doit être le titre
  // Ne pas sortir du flux de lecture plus de la majorité des contenus (avec position absolue)
  // Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p>.

  if (!only_error && isAEM) {
    const nia06o1_nodes = document.querySelectorAll(
      '.cmp-focus:not(:has(:is(h2, h3, h4, h5)))'
    );
    if (nia06o1_nodes && nia06o1_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o1' class='result-focus label-yellow'>06-O</a> : Absence de titre sur un composant focus</li>"
      );
      setItemsOutline(nia06o1_nodes, 'yellow', 'nia06o1', '06-O');
    }
  }

  if (!only_redactor && isAEM) {
    const nia06o2_nodes = document.querySelectorAll('.cmp-focus');
    let nia06o2_lists, nia06o2_items;
    let nia06o2_itemTitle, nia06o2_itemContent;
    let nia06o2_flag = false;
    let nia06o3_flag = false;
    let nia06o4_flag = false;
    let nia06o4_counter;
    let nia06o5_flag = false;
    let nia06o6_flag = false;
    let nia06o7_flag = false;

    if (nia06o2_nodes && nia06o2_nodes.length > 0) {
      for (let i = 0; i < nia06o2_nodes.length; i++) {
        nia06o2_lists = nia06o2_nodes[i].querySelectorAll('ul, ul ul');
        nia06o2_items = nia06o2_nodes[i].querySelectorAll(
          '.cmp-focus-list-item, .cmp-focus-top, .search-result'
        );

        nia06o4_counter = 0;
        if (
          nia06o2_lists &&
          nia06o2_items &&
          ((nia06o2_lists.length == 1 && nia06o2_items.length > 1) ||
            (nia06o2_lists.length == 0 && nia06o2_items.length == 1))
        ) {
          // OK
        } else if (
          nia06o2_lists &&
          nia06o2_items &&
          nia06o2_lists.length == 1 &&
          nia06o2_items.length == 1
        ) {
          if (!only_error) {
            nia06o3_flag = true;
            setItemOutline(nia06o2_nodes[i], 'orange', 'nia06o3', '06-O');
          }
        } else {
          if (debug_flag) console.log(nia06o2_lists);
          if (debug_flag) console.log(nia06o2_items);

          nia06o2_flag = true;
          setItemOutline(nia06o2_nodes[i], 'orange', 'nia06o2', '06-O');
        }
        if (nia06o2_items) {
          for (let j = 0; j < nia06o2_items.length; j++) {
            nia06o2_itemTitle = nia06o2_items[j].querySelector(
              ':is(h3, h4, h5, h6)'
            );
            nia06o2_itemContent = sanitizeText(nia06o2_items[j].textContent);

            if (nia06o2_itemTitle) {
              if (
                nia06o2_itemContent ==
                sanitizeText(nia06o2_itemTitle.textContent)
              ) {
                nia06o4_counter++;
              } else if (
                nia06o2_itemContent.indexOf(
                  sanitizeText(nia06o2_itemTitle.textContent)
                ) != 0
              ) {
                if (debug_flag) console.log('content : ' + nia06o2_itemContent);
                if (debug_flag)
                  console.log(
                    'title   : ' + sanitizeText(nia06o2_itemTitle.textContent)
                  );

                nia06o5_flag = true;
                setItemOutline(nia06o2_items[j], 'orange', 'nia06o5', '06-O');
              }
            }
            if (nia06o2_itemContent == '') {
              nia06o6_flag = true;
              setItemOutline(nia06o2_items[j], 'orange', 'nia06o6', '06-O');
            }
          }

          if (nia06o4_counter > 0 && nia06o4_counter == nia06o2_items.length) {
            nia06o4_flag = true;
            setItemOutline(nia06o2_nodes[i], 'orange', 'nia06o4', '06-O');
          }
          if (
            nia06o2_items[0] &&
            nia06o2_items[0].classList.contains('cmp-focus-top') &&
            nia06o2_items.length == 1 &&
            !only_error
          ) {
            nia06o7_flag = true;
            setItemOutline(nia06o2_nodes[i], 'yellow', 'nia06o7', '06-O');
          }
        }
      }
    }
    if (nia06o2_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o2' class='result-focus label-orange'>06-O</a> : Les items du focus doivent être dans une seule et même liste 'ul' (exception si 1 seul item) </li>"
      );
    }
    if (nia06o3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o3' class='result-focus label-yellow'>06-O</a> : Si il n'y a qu'un seul item dans le focus celui-ci ne doit pas être liste 'ul'</li>"
      );
    }
    if (nia06o4_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o4' class='result-focus label-orange'>06-O</a> : Si l’intégralité des items ne contiennent qu’un seul élément textuel celui-ci sera dans un 'p' </li>"
      );
    }
    if (nia06o5_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o5' class='result-focus label-orange'>06-O</a> : Le premier élément informatif dans le DOM de chaque item doit être le titre</li>"
      );
    }
    if (nia06o6_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o6' class='result-focus label-orange'>06-O</a> : Les items du focus doivent avoir un contenu </li>"
      );
    }
    if (nia06o7_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia06o7' class='result-focus label-yellow'>06-O</a> : Vérifier s'il est normal d'avoir un focus-on-top comme seul élément du focus </li>"
      );
    }
  }
}

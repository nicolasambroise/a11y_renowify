// P Composant Grid
function check_test_06p() {
  // Les items du grid doivent est structuré sous forme de liste (ul, ol ou dl)
  // Le premier élément informatif dans le DOM de chaque item doit être le titre
  // Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p>.

  if (!only_redactor && isAEM) {
    const nia06p1_nodes = document.querySelectorAll('.cmp-grid');
    let nia06p1_items;
    let nia06p1_itemTitle,
      nia06p1_itemContent,
      nia06p1_itemTitleSani,
      nia06p1_hasImgDeco;
    let nia06p1_counter;
    let nia06p2_flag = false;
    let nia06p3_flag = false;
    let nia06p4_flag = false;

    if (nia06p1_nodes && nia06p1_nodes.length > 0) {
      for (let i = 0; i < nia06p1_nodes.length; i++) {
        if (
          nia06p1_nodes[i].tagName != 'UL' &&
          nia06p1_nodes[i].tagName != 'OL' &&
          nia06p1_nodes[i].tagName != 'DL'
        ) {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia06p1' class='result-focus label-orange'>06-O</a> : Les items du grid doivent etre structuré sous forme de liste (ul, ol ou dl)</li>"
          );
          setItemsOutline(nia06p1_nodes, 'orange', 'nia06p1', '06-P');
        }

        nia06p1_items = nia06p1_nodes[i].querySelectorAll('li, dt');
        if (nia06p1_items) {
          for (let j = 0; j < nia06p1_items.length; j++) {
            nia06p1_itemTitle = nia06p1_items[j].querySelector(
              ':is(h3, h4, h5, h6)'
            );
            nia06p1_itemContent = sanitizeText(nia06p1_items[j].textContent);

            nia06p1_hasImgInfo =
              nia06p1_items[j].querySelector('img:not([alt=""])');

            if (nia06p1_itemTitle) {
              nia06p1_itemTitleSani = sanitizeText(
                nia06p1_itemTitle.textContent
              );
              if (nia06p1_itemContent == nia06p1_itemTitleSani) {
                nia06p1_counter++;
              } else if (
                nia06p1_itemContent.indexOf(nia06p1_itemTitleSani) != 0
              ) {
                nia06p2_flag = true;
                setItemOutline(nia06p1_items[j], 'orange', 'nia06p2', '06-P');
              }
            }
            if (nia06p1_itemContent == '' && nia06p1_hasImgInfo == null) {
              nia06p4_flag = true;
              setItemOutline(nia06p1_items[j], 'orange', 'nia06p4', '06-P');
            }
          }
          if (nia06p1_counter == nia06p1_items.length) {
            nia06p3_flag = true;
            setItemOutline(nia06p1_nodes[i], 'orange', 'nia06p3', '06-P');
          }
        }
      }
    }
    if (nia06p2_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06p2' class='result-focus label-orange'>06-P</a> : Le premier élément informatif dans le DOM de chaque item doit être le titre</li>"
      );
    }
    if (nia06p3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06p3' class='result-focus label-orange'>06-P</a> : Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p> </li>"
      );
    }
    if (nia06p4_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06p4' class='result-focus label-orange'>06-P</a> : Les items du grid doivent avoir un contenu </li>"
      );
    }
  }
}

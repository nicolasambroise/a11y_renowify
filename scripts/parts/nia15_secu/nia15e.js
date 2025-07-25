// E Liens vers des documents en téléchargement
function check_test_15e() {
  if (!only_error) {
    const nia15e_nodes = document.querySelectorAll(
      'a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".ppt"], a[href$=".pptx"], a[href$=".txt"]'
    );
    if (
      nia15e_nodes &&
      nia15e_nodes.length > 0 &&
      isItemsVisible(nia15e_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia15e' class='result-focus label-yellow'>15-E</a> : Vérifiez si ce document ne peut pas être fourni au formt PDF ou HTML</li>"
      );
      setItemsOutline(nia15e_nodes, 'yellow', 'nia15e', '15-E');
    }
  }
}

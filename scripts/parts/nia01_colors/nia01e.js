// E presence de dégradé sans couleur de replis
// Pour des soucis de perf, on ne test que certain element
function check_test_01e() {
  if (!only_redactor) {
    const nia01e_nodes = document.querySelectorAll('header, footer, .cmp-section, aside, article');
    let nia01e_flag = false;
    if (nia01e_nodes && nia01e_nodes.length > 0) {
      for (let i = 0; i < nia01e_nodes.length; i++) {
        if (isItemVisible(nia01e_nodes[i])) {
          nia01e_bgi = window.getComputedStyle(nia01e_nodes[i], null).getPropertyValue('background-image');
          nia01e_bgc = window.getComputedStyle(nia01e_nodes[i], null).getPropertyValue('background-color');
          if (nia01e_bgi.indexOf("linear-gradient") >= 0 && nia01e_bgc == "rgba(0, 0, 0, 0)") {
            nia01e_flag = true;
            setItemOutline(nia01e_nodes[i], "yellow", "nia01e", "01-E");
          }
        }
      }
    }
    if (nia01e_flag == true) {
      setItemToResultList("man", "<li><a href='#' data-destination='nia01e' class='result-focus label-yellow'>01-E</a> : Vérifier la présence d'une couleur de replis sur des éléments avec fond en dégradé.</li>");
    }
  }
}
// C. Heading caché au outil d'assistance
function check_test_14c() {
  if (!only_redactor) {
    const nia14c_nodes = document.querySelectorAll(
      'h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]'
    );
    const nia14c_heading = document.querySelectorAll(
      'h1:not([aria-hidden]),h2:not([aria-hidden]),h3:not([aria-hidden]),h4:not([aria-hidden]),h5:not([aria-hidden]),h6:not([aria-hidden])'
    );
    let nia14c_flag = false;
    let nia14c_find = false;
    if (
      nia14c_nodes &&
      nia14c_nodes.length > 0 &&
      isItemsVisible(nia14c_nodes)
    ) {
      // console.log(nia14c_nodes)
      // il faut vérifier s'il n'y a pas un titre de même niveau et de même contenu présent sur la page.
      for (let i = 0; i < nia14c_nodes.length; i++) {
        if (isItemVisible(nia14c_nodes[i])) {
          nia14c_find = false;
          for (let j = 0; j < nia14c_heading.length; j++){
            if(nia14c_nodes[i].tagName == nia14c_heading[j].tagName && sanitizeText(
              nia14c_nodes[i].textContent) == sanitizeText(
              nia14c_heading[j].textContent)
            ){
              //console.log("find : "+nia14c_nodes[i].textContent)
              nia14c_find = true;
              break;
            }
          }
          if (nia14c_find == false) {
            setItemOutline(nia14c_nodes[i], 'red', 'nia14c', '14-C');
            nia14c_flag = true;
          }
        }
      }
    }
    if (nia14c_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia14c' class='result-focus label-red'>14-C</a> : Présence de titre caché aux outils d'assistance</li>"
      );
    }
  }
}

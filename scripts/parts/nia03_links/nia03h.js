// H. Liens tel: mailto: fax:
function check_test_03h() {
  const nia03h_nodes = document.querySelectorAll(
    '*:not(.mcgyver-slot) > a[href^="mailto:"],a[href^="fax:"],a[href^="tel:"]'
  );
  let nia03h_flag = false;
  let nia03h_regexmail =
    /^((?=.+@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,}))$/;
  let nia03h_regexphone = /^((\+|00)|\((\+|00)[0-9]{1,4}\))?[0-9+\-\s().]*$/;
  let nia03h_content = '';

  if (nia03h_nodes && nia03h_nodes.length > 0) {
    for (let i = 0; i < nia03h_nodes.length; i++) {
      if (isItemVisible(nia03h_nodes[i])) {
        nia03h_content = nia03h_nodes[i].getAttribute('href');
        // Si mailto verification de la regex email
        if (
          nia03h_content.indexOf('mailto:') == 0 &&
          nia03h_content.replace('mailto:', '').match(nia03h_regexmail)
        ) {
          // OK
        }
        // Si tel ou fax verifiation de la regex tel
        else if (
          nia03h_content.indexOf('tel:') == 0 &&
          nia03h_content.replace('tel:', '').match(nia03h_regexphone)
        ) {
          // OK
        } else if (
          nia03h_content.indexOf('fax:') == 0 &&
          nia03h_content.replace('fax:', '').match(nia03h_regexphone)
        ) {
          // OK
        } else {
          setItemOutline(nia03h_nodes[i], 'red', 'nia03h', '03-H');
          nia03h_flag = true;
        }
      }
    }
  }
  if (nia03h_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03h' class='result-focus label-red'>03-H</a> : Présence de liens tel:, fax: ou mailto: non valide </li>"
    );
  }
}

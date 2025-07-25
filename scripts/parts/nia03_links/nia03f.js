// F. Chaque lien a t'il un intitulé
function check_test_03f() {
  const nia03f_nodes = document.querySelectorAll(
    'a[href]:not([href^="#"]),[role="link"][href]:not([href^="#"])'
  );
  let nia03f_flag = false;
  let nia03f_lang = '';
  if (nia03f_nodes && nia03f_nodes.length > 0) {
    for (let i = 0; i < nia03f_nodes.length; i++) {
      if (isItemVisible(nia03f_nodes[i])) {
        nia03f_lang = nia03f_nodes[i].closest('[lang]').getAttribute('lang');
        //Ni dans l'attribut title, ni dans le contenu textuel, ni dans l'attribut alt des images enfants
        if (
          !(
            nia03f_nodes[i].hasAttribute('title') &&
            sanitizeText(nia03f_nodes[i].getAttribute('title'), nia03f_lang)
              .length > 0
          ) &&
          sanitizeText(nia03f_nodes[i].innerText).length == 0 &&
          nia03f_nodes[i].querySelectorAll(
            'img:not([alt=""]):not([aria-hidden="true"]):not([hidden])'
          ).length == 0
        ) {
          setItemOutline(nia03f_nodes[i], 'red', 'nia03f', '03-F');
          nia03f_flag = true;
        }
      }
    }
  }
  if (nia03f_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03f' class='result-focus label-red'>03-F</a> : Présence de liens dont le contenu est vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-2-1' target='_blank'>RAWeb 6.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'>Opquast 131</a>]</li>"
    );
  }
}

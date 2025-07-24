// E. Vérifier que le title reprend à minimum le contenu textuel
function check_test_03e() {
  const nia03e_nodes = document.querySelectorAll('a[title]');
  let nia03e_flag = false;
  let nia03e_content = '',
    nia03e_title = '',
    nia03e_lang = '',
    nia03e_innerText = '';
  if (nia03e_nodes && nia03e_nodes.length > 0) {
    for (let i = 0; i < nia03e_nodes.length; i++) {
      if (isItemVisible(nia03e_nodes[i])) {
        nia03e_lang = nia03e_nodes[i].closest('[lang]').getAttribute('lang');
        nia03e_title = sanitizeText(
          nia03e_nodes[i].getAttribute('title'),
          nia03e_lang
        );
        nia03e_innerText = nia03e_nodes[i].innerText;
        //console.log(nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length);
        if (
          nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length > 0
        ) {
          for (
            let j = 0;
            j < nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length;
            j++
          ) {
            //console.log(nia03e_nodes[i].getElementsByClassName('checkA11YSpan')[j]);
            nia03e_innerText = nia03e_innerText.replace(
              nia03e_nodes[i].getElementsByClassName('checkA11YSpan')[j]
                .textContent,
              ''
            );
          }
        }
        nia03e_content = sanitizeText(nia03e_innerText, nia03e_lang);
        if (
          !nia03e_title.includes(nia03e_content) &&
          !nia03e_title.includes(
            nia03e_content.replace(/(pdf)([1-9])/, '$1 $2')
          )
        ) {
          if (debug_flag) {
            console.log(
              '%cERROR',
              'font-weight:700;color:darkred',
              '[' + nia03e_title + '] VS [' + nia03e_content + '] '
            );
          }
          setItemOutline(nia03e_nodes[i], 'red', 'nia03e', '03-E');
          nia03e_flag = true;
        }
      }
    }
  }
  if (nia03e_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03e' class='result-focus label-red'>03-E</a> : Présence de liens dont l'attribut title ne reprend pas le contenu textuel [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>]</li>"
    );
  }
}
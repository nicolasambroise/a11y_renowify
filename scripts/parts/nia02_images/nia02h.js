// H. L'alternative doit être courte et concise - estimation max 150 caractères
function check_test_02h() {
  const nia02h_nodes = document.querySelectorAll(
    ':where(img,svg,canvas,embed[type^="image/"],object[type^="image/"]):where([alt],[aria-label],[aria-labelledby],[title]):not([aria-hidden="true"]):not([role="presentation"]):not([role="none"])'
  );
  let nia02h_flag = false;
  let nia02h_lang = '',
    nia02h_label = '';
  if (nia02h_nodes && nia02h_nodes.length > 0) {
    for (let i = 0; i < nia02h_nodes.length; i++) {
      nia02h_lang = nia02h_nodes[i].closest('[lang]').getAttribute('lang');
      if (nia02h_nodes[i].hasAttribute('aria-labelledby')) {
        nia02h_label = document.querySelectorAll(
          "[id='" + nia02h_nodes[i].getAttribute('aria-labelledby') + "']"
        );
        if (!nia02h_label || nia02h_label.length != 1) {
          setItemOutline(nia02h_nodes[i], 'red', 'nia02h1', '02-H');
          setItemToResultList(
            'nc',
            "<li><a href='#' data-destination='nia02h1' class='result-focus label-red'>02-H</a> : Problème de référence introuvable ur un attribut aria-labelledby</li>"
          );
        } else if (
          !only_error &&
          sanitizeText(nia02h_label[0].textContent, nia02h_lang).length > 150
        ) {
          setItemOutline(nia02h_nodes[i], 'yellow', 'nia02h', '02-H');
          nia02h_flag = true;
        }
      } else if (
        !only_error &&
        nia02h_nodes[i].hasAttribute('aria-label') &&
        sanitizeText(nia02h_nodes[i].getAttribute('aria-label'), nia02h_lang)
          .length > 150
      ) {
        setItemOutline(nia02h_nodes[i], 'yellow', 'nia02h', '02-H');
        nia02h_flag = true;
      } else if (
        !only_error &&
        nia02h_nodes[i].hasAttribute('alt') &&
        sanitizeText(nia02h_nodes[i].getAttribute('alt'), nia02h_lang).length >
          150
      ) {
        setItemOutline(nia02h_nodes[i], 'yellow', 'nia02h', '02-H');
        nia02h_flag = true;
      } else if (
        !only_error &&
        nia02h_nodes[i].hasAttribute('title') &&
        sanitizeText(nia02h_nodes[i].getAttribute('title'), nia02h_lang)
          .length > 150
      ) {
        setItemOutline(nia02h_nodes[i], 'yellow', 'nia02h', '02-H');
        nia02h_flag = true;
      }
    }
  }
  if (nia02h_flag == true) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia02h' class='result-focus label-yellow'>02-H</a> : Présence d'alternative textuelle trop longue [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-3-9' target='_blank'>RAWeb 1.3.9</a>]</li>"
    );
  }
}

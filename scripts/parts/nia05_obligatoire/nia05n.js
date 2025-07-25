// N. Les mises en majuscules à des fins décoratives sont effectuées à l'aide des styles.
function check_test_05n() {
  if (!only_error) {
    function isUpperCase(textInput) {
      return textInput === String(textInput).toUpperCase();
    }
    const nia05n_h1 = document.querySelector('h1');
    const nia05n_h2 = document.querySelector('h2');
    const nia05n_h3 = document.querySelector('h3');
    const nia05n_h4 = document.querySelector('h4');
    const nia05n_h5 = document.querySelector('h5');
    const nia05n_h6 = document.querySelector('h6');
    if (nia05n_h1 && isUpperCase(nia05n_h1)) {
      setItemOutline(nia05n_h1, 'yellow', 'nia05n1', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n1' class='result-focus label-yellow'>05-N</a> : Présence de titre H1 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h2 && isUpperCase(nia05n_h2)) {
      setItemOutline(nia05n_h2, 'yellow', 'nia05n2', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n2' class='result-focus label-yellow'>05-N</a> : Présence de titre H2 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h1 && isUpperCase(nia05n_h3)) {
      setItemOutline(nia05n_h3, 'yellow', 'nia05n3', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n3' class='result-focus label-yellow'>05-N</a> : Présence de titre H3 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h1 && isUpperCase(nia05n_h4)) {
      setItemOutline(nia05n_h4, 'yellow', 'nia05n4', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n4' class='result-focus label-yellow'>05-N</a> : Présence de titre H4 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h1 && isUpperCase(nia05n_h5)) {
      setItemOutline(nia05n_h5, 'yellow', 'nia05n5', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n5' class='result-focus label-yellow'>05-N</a> : Présence de titre H5 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h1 && isUpperCase(nia05n_h6)) {
      setItemOutline(nia05n_h6, 'yellow', 'nia05n6', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n6' class='result-focus label-yellow'>05-N</a> : Présence de titre H6 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
  }
}

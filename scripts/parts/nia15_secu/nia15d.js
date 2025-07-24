// D. Le code source de chaque page contient une métadonnée qui définit le jeu de caractères UTF-8
function check_test_15d() {

  if (!only_redactor && !only_error) {
    const nia15d_node = document.querySelector('meta[charset="UTF-8"]');
    if (nia15d_node == null) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-yellow'>15-D</span> : Le code source de chaque page contient une métadonnée qui définit le jeu de caractères UTF-8 [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-definit-le-jeu-de-caracteres' target='_blank'>Opquast 225</a>, <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-codage-de-caracteres-utilise-est-utf-8' target='_blank'>226</a>]</li>"
      );
    }
  }
}
// C. Toutes les pages utilisent le protocole HTTPS.
function check_test_15c() {
  if (!only_redactor) {
    if (window.location.protocol != 'https:') {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-red'>15-C</span> : Les pages doivent utiliser le protocole HTTPS [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/toutes-les-pages-utilisent-le-protocole-https' target='_blank'>Opquast 192</a>]</li>"
      );
    }
  }
}
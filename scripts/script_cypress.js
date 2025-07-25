/* Script Check A11Y Renowify - Nicolas AMBROISE */

if (!document.body.classList.contains('renowify-script-injected')) {
  // Environnement
  const pluginUrl = 'https://webux.gouv.etat.lu/a11y/a11y_renowify';

  console.log('Run Renowify (script_bookmarklet)');

  const load_renowify = new Promise(function (resolve, reject) {
    let script = document.createElement('script');
    script.id = 'injected-js-renowify';
    script.src = pluginUrl + '/scripts/renowify.js' + '?v=' + Date.now();

    script.onload = () => resolve(script);
    script.onerror = () =>
      reject(new Error(`Script load error for renowify.js`));

    if (document.getElementById('injected-js-renowify') === null)
      document.head.append(script);
  });

  load_renowify.then(function () {
    debug_flag = false; // true -> affiche les logs
    only_redactor = false; // true --> affiche uniquement les critères relatif au redacteur
    only_error = true; // true --> affiche uniquement les Non-conformités critiques
    save_to_db = false; // true --> autorise la sauvegarde des resultats en base de données
    run_html5 = false; // true --> lance le script W3C de detection d'erreur HTML5
    run_lighthouse = false; // true --> lance le script Lighthouse de Google (Attention aux Quotas)
    run_wave = false; // true --> lance le script Wave (Attention aux Quotas)
    setTimeout(
      run_renowify(
        debug_flag,
        only_redactor,
        only_error,
        save_to_db,
        pluginUrl,
        run_html5,
        run_lighthouse,
        run_wave,
        '',
        ''
      ),
      100
    );
  });
} else {
  alert("Merci de recharger la page avant d'effectuer un nouveau check !");
}

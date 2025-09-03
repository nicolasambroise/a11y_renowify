/* Script Check A11Y Renowify - Nicolas AMBROISE */

if (!document.body.classList.contains('renowify-script-injected')) {
  // Environnement
  const pluginUrl = 'https://webux.gouv.etat.lu/a11y/a11y_renowify';

  console.log('Run Renowify (script_cypress)');

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
    setTimeout(
      run_renowify(
        debug_flag,
        only_redactor,
        only_error,
        pluginUrl
      ),
      100
    );
  });
} else {
  alert("Merci de recharger la page avant d'effectuer un nouveau check !");
}

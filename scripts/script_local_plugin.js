/* Script Check A11Y Renowify - Nicolas AMBROISE */

if (document.body.classList.contains('renowify-script-injected')) {
  // Variables config globale
  const debug_flag = true; // true -> affiche les logs
  const only_redactor = false; // true --> affiche uniquement les critères relatif au redacteur
  const only_error = false; // true --> affiche uniquement les Non-conformités critiques

  // Environnement
  const pluginUrl = 'https://nicolasambroise.github.io/a11y';

  console.log('Run Renowify (script_local_plugin)');
  run_renowify(
    debug_flag,
    only_redactor,
    only_error,
    pluginUrl,
  );
} else {
  toggleCheckA11YPanel();
}

/* Script Check A11Y Renowify - Nicolas AMBROISE */

if (document.body.classList.contains('renowify-script-injected')) {
  // Variables config globale
  const debug_flag = true; // true -> affiche les logs
  const only_redactor = false; // true --> affiche uniquement les critères relatif au redacteur
  const only_error = false; // true --> affiche uniquement les Non-conformités critiques
  const save_to_db = true; // true --> autorise la sauvegarde des resultats en base de données
  const run_html5 = true; // true --> lance le script W3C de detection d'erreur HTML5
  const run_lighthouse = false; // true --> lance le script Lighthouse de Google (Attention aux Quotas)
  const run_wave = false; // true --> lance le script Wave (Attention aux Quotas)

  // Environnement
  const pluginUrl = 'https://webux.gouv.etat.lu/a11y/a11y_bookmarklet/src';

  console.log('Run Renowify (script_redac)');
  run_renowify(debug_flag, only_redactor, only_error, save_to_db, pluginUrl, run_html5, run_lighthouse, run_wave, "","");
} else {
  toggleCheckA11YPanel();
}

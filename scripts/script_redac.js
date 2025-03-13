/* Script Check A11Y Renowify - Nicolas AMBROISE */

if(document.body.classList.contains('panel-injected')){
	// Variables config globale
	const debug_flag = false; // true -> affiche les logs
	const only_redactor = true; // true --> affiche uniquement les critères relatif au redacteur
	const only_error = false; // true --> affiche uniquement les Non-conformités critiques
	const save_to_db = false; // true --> autorise la sauvegarde des resultats en base de données

	// Environnement
	const pluginUrl = "https://webux.gouv.etat.lu/a11y/a11y_bookmarklet/src";

	console.log("Run Renowify (script_redac)")
	run_renowify(debug_flag,only_redactor,only_error,save_to_db,pluginUrl);
}
else{
	toggleCheckA11YPanel();
}
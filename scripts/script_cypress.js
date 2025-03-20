/* Script Check A11Y Renowify - Nicolas AMBROISE */

if(!document.body.classList.contains('panel-injected')){

	// Environnement
	const pluginUrl = "https://webux.gouv.etat.lu/a11y/a11y_renowify";

	console.log("Run Renowify (script_bookmarklet)")
	
	const load_renowify = new Promise(function(resolve, reject) {
		let script = document.createElement('script');
		script.id = 'injected-js-renowify';
		script.src = pluginUrl + "/scripts/renowify.js" + '?v=' + Date.now();

		script.onload = () => resolve(script);
		script.onerror = () => reject(new Error(`Script load error for renowify.js`));

		if (document.getElementById('injected-js-renowify') === null) document.head.append(script);
	  });
	
	load_renowify.then(function() {
		only_error = true;
		setTimeout(run_renowify(debug_flag,only_redactor,only_error,save_to_db,pluginUrl), 100);
	}) 

}
else{
	alert("Merci de recharger la page avant d'effectuer un nouveau check !")
}

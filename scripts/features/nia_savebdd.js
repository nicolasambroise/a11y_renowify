// Fonction Save result to db
function saveResultsInBdd() {
  console.log('saveResultsInBdd');

	/*
	let dataToSave = {
		"url":  currentUrl,
		"nc": result_nc_nb,
		"nc_details" :  removeBracket(result_nc),
		"nth" : result_nth_nb,
		"nth_details" : removeBracket(result_nth),
		"man" : result_man_nb,
		"man_details" : removeBracket(result_man),
		"dev" : result_dev_nb,
		"dev_details" : removeBracket(result_dev),
		"crit" : result_crit_nb,
		"crit_details" : removeBracket(result_crit),
		"w3c" : result_html5,
		"wave" : result_wave,
		"lighthouse" : result_lighthouse
	};*/
	
	let dataToSave = {
		"page_id": "0",
		"url":  currentUrl,
		"bm_crit": result_crit_nb,  // Nombre d'observation critique via plugin Renowify
		"bm_nc": result_nc_nb, // non-conforme
		"bm_nth": result_nth_nb, // nice-to-have
		"bm_dev": result_dev_nb, // dev
		"bm_man": result_man_nb, // manuelle
		"bm_details": "",
		"w3c_error": result_html5_nb, // Nombre d'erreur norme HTML5 W3C
		"w3c_details": result_html5,
		"wave_error": "",
		"wave_contrast": "",
		"wave_alert": "",
		"wave_structure": "", 
		"lh_access": result_lighthouse_access,
		"lh_bp": result_lighthouse_bp,
		"lh_seo": result_lighthouse_seo,
		"source": "cypress"
	};

	console.log(dataToSave);

  if (!isPreview && save_to_db) {
    // Version 2023
    /*
		const db_api_url = "https://webux.gouv.etat.lu/a11y/a11y_bookmarklet/backend/save_result.php"; 
		console.log("START Save Bdd");
		fetch(db_api_url, {
				method: "POST",
				headers: {'Content-Type': 'text/html;charset=UTF-8'}, 
				body: JSON.stringify(dataToSave)
			})
			// output the status and return response
			.then((response) => {
			  if (response.ok) {return response;}
			  return Promise.reject(response); 
			})
			.then(response => console.log(response.status) || response)
			.catch((response) => {
			  console.log(JSON.stringify(dataToSave))
			  console.log(response.status, response.statusText);
			});
		*/
    // Version 2025

    const db_api_url = 'http://127.0.0.1:3005/'; // Projet ciwuxacc_api

    const db_api_endpoint_page = 'page/url/';
    const db_api_endpoint_ta = 'ta/';

    console.log('START Save Bdd');

    // Step 1 get pageId
    fetch(db_api_url + db_api_endpoint_page + encodeURIComponent(currentUrl), {
      method: 'GET',
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    })
      .then((response) => {
        if (response.ok) {return response.json();}
        return Promise.reject(response);
      })
      .then((response_json) => {
		console.log(response_json.data);
        // {"data":[{"id":223,"website_id":229,"url":"https://mengstudien.public.lu","title":"Mengstudien","iso":"FR","category":"Homepage","status":200,"date_creation":"2024-09-17T22:00:00.000Z","date_update":null}]}

		if(response_json.data && response_json.data[0].id){ 
			let pageId = response_json.data[0].id
			console.log(pageId);
			dataToSave.page_id = pageId;
			console.log(dataToSave);
		
			fetch(db_api_url + db_api_endpoint_ta, {
				method: 'POST',
				headers: {'Accept': 'application/json',
'Content-Type': 'application/json;charset=UTF-8'}, 
				body: JSON.stringify(dataToSave)
			})
			// output the status and return response
			.then((response2) => {
			  if (response2.ok) {return response2.json();}
			  return Promise.reject(response2); 
			})
			.then((response_json2) => {
				console.log(response_json2);
				console.log("Data saved !");
			})
			.catch((response_err2) => {
			  console.log("Error envoi à la base de données (donnée des tests auto)");
			  console.log(JSON.stringify(dataToSave))
			  console.log(response_err2.status, response_err2.statusText);
			});
		}
      })
      .catch((response_err) => {
		console.log("Error envoi à la base de données (recupération de l'id de la page)");
        console.log(JSON.stringify(dataToSave));
        console.log(response_err.status, response_err.statusText);
      });
  }
}

// Fonction pour enlever les crochets et leur contenu à l'interieur de ceux-ci
function removeBracket(data){
	return data ? data.replaceAll(/(\r\n|\n|\r)/g, "").replaceAll(/\[.+?\]/g, "").replaceAll(/"/g, "'") : "";	
}

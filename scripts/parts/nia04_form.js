/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-04 Formulaire - Thématique RAWeb 11
- Autocomplete : Mise en avant des champs de formulaire avec un attribut autocomplete et vérification de la présence des attributs autocomplete pertinent sur les champs de formulaire classique */
function check_part_04(){
	if(debug_flag) console.log("04 Formulaire");

	// A. Champ générique 
	const nia04a1_nodes = document.querySelectorAll('input[name="name"]:not([autocomplete="family-name"]), input[name="lastname"]:not([autocomplete="family-name"])');
	if(nia04a1_nodes && nia04a1_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a1' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (name) - utiliser 'family-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a1_nodes,"red","nia04a1","04-A");
	}
	const nia04a2_nodes = document.querySelectorAll('input[name="firstname"]:not([autocomplete="given-name"])');
	if(nia04a2_nodes && nia04a2_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a2' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (firstname) - utiliser 'given-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a2_nodes,"red","nia04a2","04-A");
	}
	const nia04a3_nodes = document.querySelectorAll('input[type="email"]:not([autocomplete="email"])');
	if(nia04a3_nodes && nia04a3_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a3' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (email) - utiliser 'email' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a3_nodes,"red","nia04a3","04-A");
	}
	const nia04a4_nodes = document.querySelectorAll('input[type="tel"]:not([autocomplete="tel"]), input[name="phone"]:not([autocomplete="tel"])');
	if(nia04a4_nodes && nia04a4_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a4' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (phone) - utiliser 'tel' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a4_nodes,"red","nia04a4","04-A");
	}
	const nia04a5_nodes = document.querySelectorAll('input[name="postal"]:not([autocomplete="postal-code"]),input[type="postal-code"]:not([autocomplete="postal-code"])');
	if(nia04a5_nodes && nia04a5_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a5' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (postal) - utiliser 'postal-code' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a5_nodes,"red","nia04a5","04-A");
	}
	const nia04a6_nodes = document.querySelectorAll('input[name="country"]:not([autocomplete="country-name"]), select[name="country"]:not([autocomplete="country"])');
	if(nia04a6_nodes && nia04a6_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a6' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (country) - utiliser 'country-name' ou 'country' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a6_nodes,"red","nia04a6","04-A");
	}
	const nia04a7_nodes = document.querySelectorAll('input[name="matricule"][autocomplete]');
	if(nia04a7_nodes && nia04a7_nodes.length > 0 ){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a7' class='result-focus label-red'>04-A</a> : Attribut erronée sur des champs formulaire (matricule) - Enlever l'attribut [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a7_nodes,"red","nia04a7","04-A");
	}
	const nia04a8_nodes = document.querySelectorAll('input[name="city"]:not([autocomplete="address-level2"]), input[name="ville"]:not([autocomplete="address-level2"])');
	if(nia04a8_nodes && nia04a8_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a8' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (ville) - Utiliser 'address-level2' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a8_nodes,"red","nia04a8","04-A");
	}
	const nia04a9_nodes = document.querySelectorAll('textarea[name="adresse"]:not([autocomplete="street-address"]), input[name="adresse"]:not([autocomplete="street-address"]), input[name="street"]:not([autocomplete="street-address"])');
	if(nia04a9_nodes && nia04a9_nodes.length > 0 ){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a9' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (adresse) - Utiliser 'street-address' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a9_nodes,"red","nia04a9","04-A");
	}
	const nia04a10_nodes = document.querySelectorAll('input[name="organisation"]:not([autocomplete="organization"]), input[name="organization"]:not([autocomplete="organization"]),input[name="organism"]:not([autocomplete="organization"])');
	if(nia04a10_nodes && nia04a10_nodes.length > 0 ){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a10' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (organisation) - utiliser 'organization' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a10_nodes,"red","nia04a10","04-A");
	}
	const nia04a11_nodes = document.querySelectorAll('input[name="fonction"]:not([autocomplete="organization-title"]), input[name="function"]:not([autocomplete="organization-title"])');
	if(nia04a11_nodes && nia04a11_nodes.length > 0 ){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04a11' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (function) - utiliser 'organization-title' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04a11_nodes,"red","nia04a11","04-A");
	}
	
	/* Liste des autocomplete : 
	
	name - Nom complet ;
	honorific-prefix - Abréviation, civilité ou titre ;
	given-name - Prénom ;
	additional-name - Prénoms additionnels ;
	family-name - Nom de famille ;
	honorific-suffix - Suffixe honorifique ;
	nickname - Surnom, diminutif ;
	organization-title - Fonction, intitulé de poste ;
	username - Nom d’utilisateur ;
	new-password - Nouveau mot de passe (par exemple, lors de la création d’un compte ou d’un changement de mot de passe) ;
	current-password - Mot de passe actuel pour le compte identifié par le champ username (par exemple, lors d’une connexion) ;
	organization - Nom de l’organisation correspondant à la personne, à l’adresse ou à l’information de contact dans les autres champs associés avec ce champ ;
	street-address - Adresse postale (multiligne, nouvelles lignes conservées) ;
	address-line1 - Adresse postale (une ligne par champ, ligne 1) ;
	address-line2 - Adresse postale (une ligne par champ, ligne 2) ;
	address-line3 - Adresse postale (une ligne par champ, ligne 3) ;
	address-level4 - Le niveau administratif le plus détaillé, pour les adresses pourvues de quatre niveaux administratifs ;
	address-level3 - Le troisième niveau administratif, pour les adresses pourvues d’au moins trois niveaux administratifs ;
	address-level2 - Le deuxième niveau administratif, pour les adresses pourvues d’au moins deux niveaux administratifs ;
	address-level1 - Le plus large niveau administratif d’une adresse, c’est-à-dire la province dans laquelle se trouve la localité ;
	country - Code pays ;
	country-name - Nom de pays ;
	postal-code - Code postal, code CEDEX (si le CEDEX est présent, ajouter “CEDEX”, et ce qui le suit doit être ajouté dans le champ address-level2) ;
	cc-name - Nom complet figurant sur le moyen de paiement ;
	cc-given-name - Prénom figurant sur le moyen de paiement ;
	cc-additional-name - Prénoms additionnels figurant sur le moyen de paiement cc-family-name - Nom de famille figurant sur le moyen de paiement ;
	cc-number - Code identifiant le moyen de paiement (e.g., un numéro de carte bancaire) ;
	cc-exp - Date d’expiration du moyen de paiement ;
	cc-exp-month - Le mois de la date d’expiration du moyen de paiement ;
	cc-exp-year - L’année de la date d’expiration du moyen de paiement ;
	cc-csc - Code de sécurité du moyen de paiement (also known as the card security code (CSC), card validation code (CVC), card verification value (CVV), signature panel code (SPC), credit card ID (CCID), etc.) ;
	cc-type - Type de moyen de paiement (e.g. Visa) ;
	transaction-currency - La devise qui a la préférence de l’utilisateur lors d’une transaction ;
	transaction-amount - Le montant qui a la préférence de l’utilisateur lors d’une transaction (e.g., en réponse à une enchère ou à un prix soldé) ;
	language - Langage préféré ;
	bday - Date d’anniversaire ;
	bday-day - Le jour de la date d’anniversaire ;
	bday-month - Le mois de la date d’anniversaire ;
	bday-year - L’année de la date d’anniversaire ;
	sex - Identité sexuelle ;
	url - Page d’accueil ou une autre page Web correspondant à l’organisation, la personne, l’adresse ou à l’information de contact dans les autres champs associés avec ce champ ;
	photo - Photographie, icone ou une autre image correspondant à l’organisation, la personne, l’adresse ou à l’information de contact dans les autres champs associés avec ce champ ;
	tel - Numéro de téléphone complet, y compris le code pays ;
	tel-country-code - Code pays du numéro de téléphone ;
	tel-national - Numéro de téléphone sans la partie code pays, avec un préfixe interne au pays, s’il y a lieu ;
	tel-area-code - Indicatif régional du numéro de téléphone, avec un préfixe interne au pays, s’il y a lieu ;
	tel-local - Numéro de téléphone sans la partie code pays ni l’indicatif régional ;
	tel-local-prefix - La première partie du composant du numéro de téléphone qui suit l’indicatif régional, lorsque ce composant est scindé en deux parties ;
	tel-local-suffix - La seconde partie du composant du numéro de téléphone qui suit l’indicatif régional, lorsque ce composant est scindé en deux parties ;
	tel-extension - Numéro de téléphone d’un poste interne ;
	email - Adresse électronique ;
	impp - URL correspondant d’un protocole de messagerie instantanée (par exemple, "aim:goim?screenname=example" ou "xmpp:fred@example.net").*/

	if(!only_error && isCTIE){
		const nia04a12_nodes = document.querySelectorAll('[autocomplete="name"],[autocomplete="honorific-suffix"],[autocomplete="nickname"],[autocomplete="address-level1"],[autocomplete="address-level3"],[autocomplete="address-level4"],[autocomplete="cc-name"],[autocomplete="cc-given-name"],[autocomplete="cc-additional-name"],[autocomplete="cc-number"],[autocomplete="cc-exp"],[autocomplete="cc-exp-month"],[autocomplete="cc-exp-year"],[autocomplete="cc-csc"],[autocomplete="cc-type"],[autocomplete="transaction-currency"],[autocomplete="transaction-amount"],[autocomplete="language"],[autocomplete="bday-day"],[autocomplete="bday-month"],[autocomplete="bday-year"],[autocomplete="sex"],[autocomplete="photo"],[autocomplete="tel-area-code"],[autocomplete="tel-local"],[autocomplete="tel-local-prefix"],[autocomplete="tel-local-suffix"],[autocomplete="tel-extension"],[autocomplete="impp"]');
		if(nia04a12_nodes && nia04a12_nodes.length > 0 ){
		  setItemToResultList("man","<li><a href='#' data-destination='nia04a12' class='result-focus label-yellow'>04-A</a> : Présence d'attribut autocomplete vraisemblablement erronée sur des champs formulaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a12_nodes,"yellow","nia04a12","04-A");
		}
	}
	
	// B. Vérifier le format sur l'email
	const nia04b_nodes = document.querySelectorAll('input[type="email"]');
	let nia04b_flag = false;
	let nia04b_id = "", nia04b_desc = "", nia04b_label = "", nia04b_help = "";
	if(nia04b_nodes && nia04b_nodes.length > 0){
		for(let i = 0; i < nia04b_nodes.length; i++){
			nia04b_id = "", nia04b_desc = "", nia04b_label = "", nia04b_help = "";
			nia04b_id = nia04b_nodes[i].getAttribute("id");
			nia04b_desc = nia04b_nodes[i].getAttribute("aria-describedby");
			if(nia04b_id && nia04b_id != ""){
				nia04b_label = document.querySelector("label[for='"+nia04b_id+"']");
				if(!nia04b_label){
					setItemOutline(nia04b_nodes[i],"red","nia04b","04-B");
					nia04b_flag = true;
				}
			}
			if(nia04b_desc && nia04b_desc != ""){
				nia04b_help = document.querySelector("[id="+nia04b_desc+"]");
				if(!nia04b_help){
					setItemOutline(nia04b_nodes[i],"red","nia04b","04-B");
					nia04b_flag = true;
				}
			}
			if((nia04b_label && nia04b_label != "" && nia04b_label.innerText.match(/^\S+@\S+\.\S+$/)) || (nia04b_help && nia04b_help != "" && nia04b_help.innerText.match(/^\S+@\S+\.\S+$/))){
				setItemOutline(nia04b_nodes[i],"red","nia04b","04-B");
				nia04b_flag = true;
			}
		}
	}
	if(nia04b_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04b' class='result-focus label-red'>04-B</a> : Présence de champs email sans exemple de format [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-5' target='_blank'>RAWeb 11.10.5</a>]</li>");
	}
		
		// C. Check intitulé bouton envoi 
	if(!only_error && isAEM){
		const nia04c_btn = document.querySelector('html[lang="fr"] form button.cmp-form-button[type="SUBMIT"][name="preview"]');
		if(nia04c_btn && nia04c_btn.textContent != "Prévisualiser puis envoyer" ){
		  setItemToResultList("nth","<li><a href='#' data-destination='nia04c' class='result-focus label-yellow'>04-C</a> : Vérifier si le bouton de soumission possède bien la notion de prévisualisation' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-12-1' target='_blank'>RAWeb 11.12.1</a>]</li>");
		  setItemsOutline(nia04c_btn,"yellow","nia04c","04-C");
		}
	}

	

	// D. Vérifier si les champs ont bien un label
	const nia04d_nodes = document.querySelectorAll("input:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])");
	let nia04d_flag1 = false;
	let nia04d_flag2 = false;
	let nia04d_label = "", nia04d_id = "";
	if(nia04d_nodes && nia04d_nodes.length > 0){
		for(let i = 0; i < nia04d_nodes.length; i++){
			if(isItemVisible(nia04d_nodes[i])){
				nia04d_id = nia04d_nodes[i].getAttribute("id");
				if(!nia04d_id || nia04d_id == ""){
					setItemOutline(nia04d_nodes[i],"red","nia04d","04-D");
					nia04d_flag1 = true;
				}
				else{
					nia04d_label = document.querySelectorAll("label[for='"+nia04d_id+"']");
					if(!nia04d_label || nia04d_label.length == 0){
						setItemOutline(nia04d_nodes[i],"red","nia04d","04-D");
						nia04d_flag1 = true;
					}
					else if(nia04d_label.length > 1){
						setItemOutline(nia04d_nodes[i],"red","nia04d","04-D");
						nia04d_flag2 = true;
					}
				}
			}
		}
	}
	if(nia04d_flag1 == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs sans label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>");
	}
	if(nia04d_flag2 == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs avec plus d'un label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>");
	}

	// E. fieldset avec legend
	const nia04e_nodes = document.querySelectorAll('fieldset');
	let nia04e_flag = false;
	if(nia04e_nodes && nia04e_nodes.length > 0){
		for(let i = 0; i < nia04e_nodes.length; i++){
			if(isItemVisible(nia04e_nodes[i])){
				if(nia04e_nodes[i].firstElementChild.tagName && nia04e_nodes[i].firstElementChild.tagName == "LEGEND"){
					// OK
				}
				else if(nia04e_nodes[i].firstElementChild.firstElementChild && nia04e_nodes[i].firstElementChild.firstElementChild.tagName && nia04e_nodes[i].firstElementChild.firstElementChild.tagName == "LEGEND"){
					// La balise légend est encapsulée dans un container
				}
				else if(sanitizeText(nia04e_nodes[i].firstElementChild.textContent) == "" && nia04e_nodes[i].firstElementChild.nextSibling && nia04e_nodes[i].firstElementChild.nextSibling.tagName == "LEGEND") {
					// Présence d'un élément décoratif avant la balise légende ( un \n, un pseudo-elem, etc.)
				}
				else{
					setItemsOutline(nia04e_nodes[i],"red","nia04e","04-E");
					nia04e_flag = true;
				}
			}
		}
	}
	if(nia04e_flag == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04e' class='result-focus label-red'>04-E</a> : Absence de la légende dans un filedset [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-6-1' target='_blank'>RAWeb 11.6.1</a>]'</li>");
	}

	// F. Required ou aria-required="true" possède un asterisque dans le label
	if(!only_redactor && isAEM){
		const nia04f_nodes = document.querySelectorAll('form [required]:not([required="false"]), form [aria-required="true"]');
		const nia04f_desc = document.querySelectorAll('.cmp-ratings, .cmp-form__mandatory-text, .mandatory-label')
		let nia04f_flag = false;
		let nia04f_id, nia04f_label;
		let nia04f_fieldset, nia04f_legend;
		if(nia04f_nodes && nia04f_nodes.length > 0){
			for(let i = 0; i < nia04f_nodes.length; i++){
				if(isItemVisible(nia04f_nodes[i])){
					if(nia04f_nodes[i].parentElement.tagName != "LABEL"){ 
						nia04f_id = nia04f_nodes[i].getAttribute("id");
						if(!nia04f_id || nia04f_id == ""){
							setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
							nia04f_flag = true;
						}
						else{
							nia04f_label = document.querySelectorAll("label[for='"+nia04f_id+"']");
							if(!nia04f_label || nia04f_label.length == 0){
								setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
								nia04f_flag = true;
							}
							else if(!(nia04f_label[0].textContent).includes("*")){
								setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
								nia04f_flag = true;
							}
						}
					}
					else { 
						// Checkbox / Radio
						nia04f_fieldset = nia04f_nodes[i].closest('fieldset');
						if(!nia04f_fieldset){
							if(!(nia04f_nodes[i].parentElement.textContent).includes("*")){
								setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
								nia04f_flag = true;
							}
						}
						else{
							nia04f_legend = nia04f_fieldset.getElementsByTagName('legend');
							if(!nia04f_legend || nia04f_legend.length != 1){
								setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
								nia04f_flag = true;
							}
							else if(!(nia04f_legend[0].textContent).includes("*")){
								setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
								nia04f_flag = true;
							}
						}
					}
				}
			}
			if(nia04f_desc.length == 0){
				setItemToResultList("nc","<li><span class='result-focus label-red'>04-F</span> : Absence d'indication de la signification de l'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a>]</li>");
			}
		}
		if(nia04f_flag == true) {
			setItemToResultList("nc","<li><a href='#' data-destination='nia04f' class='result-focus label-red'>04-F</a> : Absence d'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/letiquette-de-chaque-champ-de-formulaire-indique-si-la-saisie-est-obligatoire' target='_blank'>Opquast 69</a>]'</li>");
		}
	}

	// G. Pas d'autocomplete sur les champs radio/checkbox
	const nia04g_nodes = document.querySelectorAll('input[type="checkbox"][autocomplete]:not([autocomplete="off"]),input[type="radio"][autocomplete]:not([autocomplete="off"])');
	if(nia04g_nodes && nia04g_nodes.length > 0 && isItemsVisible(nia04g_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04g' class='result-focus label-red'>04-G</a> : Présence d'autocomplete sur un champ de type 'checkbox' ou 'Radiobutton' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04g_nodes,"red","nia04g","04-G");
	}

	// H. Champ et étiquette accolé en recupérant les positions des centres : Estimé à max 100px pour une distance correcte
	if(!only_redactor){
		function getPositionAtTopRight(element) {
			let rect
			if(element.nodeName != "#text"){
				rect = element.getBoundingClientRect();
			}
			else{
				const range = document.createRange();
				range.selectNode(element);
				rect = range.getBoundingClientRect();
			}
		  return {x: rect.left + rect.width,y: rect.top};
		}
		
		function getPositionAtTopLeft(element) {
			let rect
			if(element.nodeName != "#text"){
				rect = element.getBoundingClientRect();
			}
			else{
				const range = document.createRange();
				range.selectNode(element);
				rect = range.getBoundingClientRect();
			}
		  return {x: rect.left ,y: rect.top};
		}

		// Pour les éléments de type textfield présenté verticalement
		function getDistanceBetweenVerticalElements(a, b) {
		  const inputPosition = getPositionAtTopLeft(a);
		  const labelPosition = getPositionAtTopLeft(b);
		  return Math.hypot(inputPosition.x - labelPosition.x, inputPosition.y - labelPosition.y);  
		}
		
		// Pour les éléments de type textfield présenté inline / horizontalement
		function getDistanceBetweenHorizontalElements(a, b) {
		  const inputPosition = getPositionAtTopLeft(a);
		  const labelPosition = getPositionAtTopRight(b);
		  return Math.hypot(inputPosition.x - labelPosition.x, inputPosition.y - labelPosition.y);  
		}
		
		const nia04h_nodes = document.querySelectorAll('input[id]:not([type="button"]):not([type="reset"]):not([type="submit"]),select[id],textarea[id]');
		let nia04h_flag = false;
		let nia04h_id, nia04h_label;
		if(nia04h_nodes && nia04h_nodes.length > 0){
			for(let i = 0; i < nia04h_nodes.length; i++){
				if(isItemVisible(nia04h_nodes[i])){
					nia04h_id = nia04h_nodes[i].getAttribute("id");
					if(!nia04h_id || nia04h_id == ""){
						setItemOutline(nia04h_nodes[i],"orange","nia04h","04-H");
						nia04h_flag = true;
					}
					else{
						nia04h_label = document.querySelectorAll("label[for='"+nia04h_id+"']");
						if(!nia04h_label || nia04h_label.length == 0){
							setItemOutline(nia04h_nodes[i],"orange","nia04h","04-H");
							nia04h_flag = true;
						}
						else if(isItemVisible(nia04h_label[0]) && !isItemSROnly(nia04h_label[0])){
							let nia04h_distance_vertical = getDistanceBetweenVerticalElements(nia04h_nodes[i],nia04h_label[0]);
							let nia04h_distance_horizontal = getDistanceBetweenHorizontalElements(nia04h_nodes[i],nia04h_label[0]);
							if(nia04h_distance_vertical > 100 && nia04h_distance_horizontal > 100){
								if(debug_flag) console.log("[nia04h] distance : ["+nia04h_distance_horizontal+":"+nia04h_distance_vertical+"]");
								// Exception pour les élément de type radio/checkbox/file dont l'input est inclus dans la balise label
								if(nia04h_nodes[i].parentElement == nia04h_label[0]){
									let nia04h_distance_wrapper = getDistanceBetweenHorizontalElements(nia04h_nodes[i],nia04h_label[0].firstChild);
									if(debug_flag) console.log("[nia04h] wrap distance : ["+nia04h_distance_wrapper+"]");
									if(nia04h_distance_wrapper > 100){	
										setItemOutline(nia04h_nodes[i],"orange","nia04h","04-H");
										nia04h_flag = true;
									}
								}
								else{
									setItemOutline(nia04h_nodes[i],"orange","nia04h","04-H");
									nia04h_flag = true;
								}
							}
						}
					}
				}
			}
		}
		if(nia04h_flag == true){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04h' class='result-focus label-orange'>04-H</a> : Le Champ et l'étiquette doivent être accolé [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-5-1' target='_blank'>RAWeb 11.5.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-etiquette-de-formulaire-est-visuellement-rattachee-au-champ-quelle-decrit' target='_blank'>Opquast 75</a>]</li>");
		}
	}

	// I Les informations complétant l'étiquette d'un champ sont associées à celui-ci dans le code source
	if(!only_redactor){
		const nia04i_nodes = document.querySelectorAll("input[aria-describedby]");
		let nia04i_flag = false;
		let nia04i_desc = "", nia04i_id = "";
		if(nia04i_nodes && nia04i_nodes.length > 0){
			for(let i = 0; i < nia04i_nodes.length; i++){
				if(isItemVisible(nia04i_nodes[i])){
					nia04i_id = nia04i_nodes[i].getAttribute("aria-describedby");
					if(!nia04i_id || nia04i_id == ""){
						setItemOutline(nia04i_nodes[i],"red","nia04i","04-I");
						nia04i_flag = true;
					}
					else{
						nia04i_desc = document.querySelectorAll("[id='"+nia04i_id+"']");
						if(!nia04i_desc || nia04i_desc.length != 1){
							setItemOutline(nia04i_nodes[i],"red","nia04i","04-I");
							nia04i_flag = true;
						}
					}
				}
			}
		}
		if(nia04i_flag == true) {
			setItemToResultList("nc","<li><a href='#' data-destination='nia04i' class='result-focus label-red'>04-I</a> : Présence d'attribut aria-describedby non lié à un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-informations-completant-letiquette-dun-champ-sont-associees-a-celui-ci-dans-le-code-source' target='_blank'>Opquast 68</a>]</li>");
		}
	}
	
	// J Le format de saisie des champs de formulaire qui le nécessitent est indiqué (soit un aria-descibedby, soit des paranthèses dans le label)
	const nia04j_nodes = document.querySelectorAll("input[type='email']:not([aria-describedby]), input[type='tel']:not([aria-describedby]), input[pattern]:not([aria-describedby]):not([pattern='.*\\\\S.*'])");
	let nia04j_flag = false;
	let nia04j_label = "", nia04j_id = "";
	if(nia04j_nodes && nia04j_nodes.length > 0){
		for(let i = 0; i < nia04j_nodes.length; i++){
			if(isItemVisible(nia04j_nodes[i])){
				nia04j_id = nia04j_nodes[i].getAttribute("id");
				if(!nia04j_id || nia04j_id == ""){
					setItemOutline(nia04j_nodes[i],"red","nia04j","04-J");
					nia04j_flag = true;
				}
				else{
					nia04j_label = document.querySelectorAll("[for='"+nia04j_id+"']");
					if(!nia04j_label || nia04j_label.length != 1){
						setItemOutline(nia04j_nodes[i],"red","nia04j","04-J");
						nia04j_flag = true;
					}
					else if(nia04j_label[0].innerText.indexOf("(") < 0){
						setItemOutline(nia04j_nodes[i],"red","nia04j","04-J");
						nia04j_flag = true;
					}
				}
			}
		}
	}
	if(nia04j_flag == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04j' class='result-focus label-red'>04-J</a> : Absence du format de saisie dans un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>");
	}

	// K Présence de label de bouton insuffisament pertinent
	if(!only_error && isAEM){	
		const nia04k_nodes = document.querySelectorAll("input[type='submit'], input[type='reset'], input[type='button']");
		let nia04k_array = ["envoyer", "effacer", "annuler", "confirmer", "valider", "poursuivre", "rechercher"];
		let nia04k_flag = false;
		let nia04k_label = "";
		if(nia04k_nodes && nia04k_nodes.length > 0){
			for(let i = 0; i < nia04k_nodes.length; i++){
				if(isItemVisible(nia04k_nodes[i])){
					nia04k_label = nia04k_nodes[i].value;
					if (nia04k_label && nia04k_array.includes(nia04k_label)) {
							setItemOutline(nia04k_nodes[i],"yellow","nia04k","04-K");
							nia04k_flag = true;
					}
				}
			}
		}
		if(nia04k_flag == true) {
			setItemToResultList("nth","<li><a href='#' data-destination='nia04k' class='result-focus label-yellow'>04-K</a> : Présence de label de bouton insuffisament pertinent  </li>");
		}
	}

	// L Formulaire : bouton avant la fin du formulaire
	if(!only_error){	
		const nia04l_nodes = document.querySelectorAll('form');
		let nia04l_flag = false;
		let nia04l_childs, nia04l_lastchilds;
		if(nia04l_nodes && nia04l_nodes.length > 0){
			for(let i = 0; i < nia04l_nodes.length; i++){
				if(isItemVisible(nia04l_nodes[i])){
					nia04l_childs = nia04l_nodes[i].querySelectorAll('input , button');
					nia04l_lastchilds = nia04l_childs[nia04l_childs.length - 1]
					if(nia04l_lastchilds.tagName == "BUTTON" || (nia04l_lastchilds.tagName == "INPUT" && (nia04l_lastchilds.type == "SUBMIT" || nia04l_lastchilds.type == "RESET" || nia04l_lastchilds.type == "BUTTON"))){
							// OK
					}
					else{
						setItemOutline(nia04l_nodes[i],"yellow","nia04l","04-L");
						nia04l_flag = true;
					}
				}
			}
		}
		if(nia04l_flag == true) {
			setItemToResultList("nth","<li><a href='#' data-destination='nia04l' class='result-focus label-yellow'>04-L</a> : Formulaire avec bouton de soumission mal placé </li>");
		}
	}
	
	// M Un groupe de Checkbox/Radio doit être structuré dans un fieldset
	if(!only_redactor){	
		const nia04m_nodes = document.querySelectorAll('input[type="checkbox"],input[type="radio"]');
		let nia04m_flag = false;
		if(nia04m_nodes && nia04m_nodes.length > 0 && isItemsVisible(nia04m_nodes)){
			for(let i = 0; i < nia04m_nodes.length; i++){
				if(!nia04m_nodes[i].parentElement.closest("fieldset")){
					if(nia04m_nodes[i].parentElement.closest("cmp-form-options").querySelectorAll('input[type="checkbox"],input[type="radio"]').length > 1){
						nia04m_flag = true;
						setItemsOutline(nia04m_nodes,"orange","nia04m","04-M");
					}
				}
			}
		}
		if(nia04m_flag == true) {
			setItemToResultList("man","<li><a href='#' data-destination='nia04m' class='result-focus label-orange'>04-M</a> : Un groupe de Checkbox/Radio doit être structuré dans un fieldset</li>");
		}
	}
	
	// N Le format de saisie du datepicker est indiqué (soit un aria-descibedby, soit des paranthèses dans le label)
	const nia04n_nodes = document.querySelectorAll("input[type='text'].datepicker:not([aria-describedby]), input[type='text'][pattern='([0-9]{2}-){2}[0-9]{4}']:not([aria-describedby])");
	let nia04n_flag = false;
	let nia04n_label = "", nia04n_id = "";
	if(nia04n_nodes && nia04n_nodes.length > 0){
		for(let i = 0; i < nia04n_nodes.length; i++){
			if(isItemVisible(nia04n_nodes[i])){
				nia04n_id = nia04n_nodes[i].getAttribute("id");
				if(!nia04n_id || nia04n_id == ""){
					setItemOutline(nia04n_nodes[i],"red","nia04n","04-N");
					nia04n_flag = true;
				}
				else{
					nia04n_label = document.querySelectorAll("[for='"+nia04n_id+"']");
					if(!nia04n_label || nia04n_label.length != 1){
						setItemOutline(nia04n_nodes[i],"red","nia04n","04-N");
						nia04j_flag = true;
					}
					else if(nia04n_label[0].innerText.indexOf("(") < 0){
						setItemOutline(nia04n_nodes[i],"red","nia04n","04-N");
						nia04n_flag = true;
					}
				}
			}
		}
	}
	if(nia04n_flag == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04n' class='result-focus label-red'>04-N</a> : Absence du format de saisie dans un datepicker [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>");
	}
	
	// TODO
	/*
	- Ajouter un attribut aria_invalid=’true’ sur les champs en erreur 
	- Les messages d’erreurs de chaque champ doivent lui être lié via aria_describedby
	*/
}
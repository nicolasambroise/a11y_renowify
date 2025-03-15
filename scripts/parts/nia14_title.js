/*- ------------------------------------------------------------------------------- */
/* 🗸 NIA-07 Title : Mise en avant des titres (<Hn> et ceux qui ont les roles=heading). 
o Vérification de la présence de titres simulés - S’assurer que les titres sont bien balisés avec des balises <Hn> et pas seulement avec du gras.
o S’assurer que les titres sont dans le bon ordre*/
function check_part_14(){
	if(debug_flag) console.log("14 Titre");

	// A. Heading avec role
	const nia14a_nodes = document.querySelectorAll('h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])');
	if(nia14a_nodes && nia14a_nodes.length > 0 && isItemsVisible(nia14a_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia14a' class='result-focus label-red'>14-A</a> : Présence de titre avec un attribut role</li>");
	  setItemsOutline(nia14a_nodes,"red","nia14a","14-A");
	}

	// B. Aria-level sans heading
	const nia14b_nodes = document.querySelectorAll('[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])');
	if(nia14b_nodes && nia14b_nodes.length > 0 && isItemsVisible(nia14b_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia14b' class='result-focus label-red'>14-B</a> : Présence d'attribut aria-level en dehors de titre</li>");
	  setItemsOutline(nia14b_nodes,"red","nia14b","14-B");
	}
	
	// C. Heading caché au outil d'assistance 
	if(!only_redactor){
		const nia14c_nodes = document.querySelectorAll('h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]');
		if(nia14c_nodes && nia14c_nodes.length > 0 && isItemsVisible(nia14c_nodes)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia14c' class='result-focus label-red'>14-C</a> : Présence de titre caché aux outils d'assistance</li>");
		  setItemsOutline(nia14c_nodes,"red","nia14c","14-C");
		}
	}

	// D. Heading simulé
	if(!only_error){
		const nia14d_nodes = document.querySelectorAll('b,p:not(.cmp-form__mandatory-text) > strong:first-child ,span > strong:first-child ,div > strong:first-child , *:not(.accordionItem) > *:not(figcaption):not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content):not(.meta-themes):not(.description):not(.meta-published-update) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):not(.orejime-Notice-description):first-child');
		let nia14d_flag = false;
		let nia14d_fontSize;
		if(nia14d_nodes && nia14d_nodes.length > 0){
			for(let i = 0; i < nia14d_nodes.length; i++){
				if(isItemVisible(nia14d_nodes[i]) && nia14d_nodes[i].length < 150){
					//boucle pour exclure les textes de plus de 150 caractères 
					setItemsOutline(nia14d_nodes[i],"yellow","nia14d","14-D");
					nia14d_flag = true;
				}
			}
		}
		if(nia14d_flag == true) {
		  setItemToResultList("nth","<li><a href='#' data-destination='nia14d' class='result-focus label-yellow'>14-D</a> : Présence de texte ressemblant à des titres n'étant pas balisé comme tel - A vérifier au cas par cas [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-3' target='_blank'>RAWeb 9.1.3</a>]</li>");
		}
	}
	
	// E. Ordre Heading
	if(!only_error){
		const nia14e_nodes = document.querySelectorAll(':where(h1,h2,h3,h4,h5,h6,[role="heading"]):not([aria-hidden])');
		let nia14e_flag = false;
		let nia14e_current_level = 0, nia14e_previous_level = 0;
		if(nia14e_nodes && nia14e_nodes.length > 0){
			for(let i = 0; i < nia14e_nodes.length; i++){
				if(isItemVisible(nia14e_nodes[i])){
					if(nia14e_nodes[i].tagName == 'H1' || (nia14e_nodes[i].hasAttribute('aria-level') && nia14e_nodes[i].hasAttribute('role') && nia14e_nodes[i].getAttribute('aria-level').value == "1" && nia14e_nodes[i].getAttribute('role').value == "heading")) {nia14e_current_level = 1;}
					else if(nia14e_nodes[i].tagName == 'H3' || (nia14e_nodes[i].hasAttribute('aria-level') && nia14e_nodes[i].hasAttribute('role') && nia14e_nodes[i].getAttribute('aria-level').value == "3" && nia14e_nodes[i].getAttribute('role').value == "heading")) {nia14e_current_level = 3;}
					else if(nia14e_nodes[i].tagName == 'H4' || (nia14e_nodes[i].hasAttribute('aria-level') && nia14e_nodes[i].hasAttribute('role') && nia14e_nodes[i].getAttribute('aria-level').value == "4" && nia14e_nodes[i].getAttribute('role').value == "heading")) {nia14e_current_level = 4;}
					else if(nia14e_nodes[i].tagName == 'H5' || (nia14e_nodes[i].hasAttribute('aria-level') && nia14e_nodes[i].hasAttribute('role') && nia14e_nodes[i].getAttribute('aria-level').value == "5" && nia14e_nodes[i].getAttribute('role').value == "heading")) {nia14e_current_level = 5;}
					else if(nia14e_nodes[i].tagName == 'H6' || (nia14e_nodes[i].hasAttribute('aria-level') && nia14e_nodes[i].hasAttribute('role') && nia14e_nodes[i].getAttribute('aria-level').value == "6" && nia14e_nodes[i].getAttribute('role').value == "heading")) {nia14e_current_level = 6;}
					else {nia14e_current_level = 2;}
					if(nia14e_current_level - nia14e_previous_level > 1){
						setItemOutline(nia14e_nodes[i],"yellow","nia14e","14-E");
						if(debug_flag) console.log("  > "+nia14e_nodes[i].innerText+" | current : "+nia14e_current_level+" | previous :"+nia14e_previous_level);
						nia14e_flag = true;
					}
					nia14e_previous_level = nia14e_current_level;
				}
			}
		}
		if(nia14e_flag == true) {
		  setItemToResultList("nth","<li><a href='#' data-destination='nia14e' class='result-focus label-yellow'>14-E</a> : Présence de sauts de titres [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-1' target='_blank'>RAWeb 9.1.1</a>]</li>");
		}
		
		// F. 2 Heading H1 : Conforme seulement si pertinent
		const nia14f_nodes = document.querySelectorAll('h1, [role="heading"][aria-level="1"]');
		let nia14f_flag = false;
		let nia14f_counter = 0;
		if(nia14f_nodes && nia14f_nodes.length > 1 && isItemsVisible(nia14f_nodes)){
		  for(let i = 0; i < nia14f_nodes.length; i++){	
			if(isItemVisible(nia14f_nodes[i])){
				nia14f_counter++;
			}
		  }
		  if(nia14f_counter > 1) nia14f_flag = true;
		}
		if(nia14f_flag == true) {
		  setItemToResultList("man","<li><a href='#' data-destination='nia14f' class='result-focus label-yellow'>14-F</a> : Présence de 2 titres H1. Pertinence de ceux-ci à vérifier manuellement</li>");
		  setItemsOutline(nia14f_nodes,"yellow","nia14f","14-F");
		}
	}
}
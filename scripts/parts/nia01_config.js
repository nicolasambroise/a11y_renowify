/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-01 AEM Component 
- vérifie les points concernant la configuration des composants AEM suivant :  Intitulé de bouton menu,  Breadcrumb, Tooltip, Menu langue, Recherche, Vidéo, Menu
*/
function check_part_01(){
	if(debug_flag) console.log("01 AEM Component");

	// A. Position de bouton menu
	if(!only_redactor){
		const nia01a_nodes = document.querySelectorAll('button.anchor[data-destination^="#headernav"]:not(.anchor-close)');
		let nia01a_flag = false;
		if(nia01a_nodes && nia01a_nodes.length > 0){
			for(let i = 0; i < nia01a_nodes.length; i++){
				if(nia01a_nodes[i].closest('nav') == null){
					setItemOutline(nia01a_nodes[i],"red","nia01a","01-A");
					nia01a_flag = true;
				}
			}
		}
		if(nia01a_flag == true) {
		  setItemToResultList("dev","<li><a href='#' data-destination='nia01a' class='result-focus label-red'>01-A</a> : Présence du bouton d'ouverture du menu en dehors de la balise nav</li>");
		}
	}
	
	// B. Recherche
	
	// Presence de l'aria label
	const nia01b1_nodes = document.querySelectorAll('role[search]:not([aria-label])');
	if(nia01b1_nodes && nia01b1_nodes.length > 0 && isItemsVisible(nia01b1_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01b1' class='result-focus label-orange'>01-B</a> : Aria-label absent de la recherche</li>");
	  setItemsOutline(nia01b1_nodes,"orange","nia01b1","01-B");
	}

	// Placeholder différent du titre
	const nia01b2_nodes = document.querySelectorAll('input[type="search"]');
	let nia01b2_flag = false;
	if(nia01b2_nodes && nia01b2_nodes.length > 0 && isItemsVisible(nia01b2_nodes)){
	  for(let i = 0; i < nia01b2_nodes.length; i++){

		if(nia01b2_nodes[i].hasAttribute("placeholder") && nia01b2_nodes[i].hasAttribute("title") && nia01b2_nodes[i].getAttribute("placeholder") != nia01b2_nodes[i].getAttribute("title")){
			nia01b2_flag = true;
			setItemOutline(nia01b2_nodes[i],"red","nia01b2","01-B");
		}
	  }
	}
	if(nia01b2_flag == true){
	   setItemToResultList("dev","<li><a href='#' data-destination='nia01b2' class='result-focus label-red'>01-B</a> : Problème avec le placeholder de la recherche</li>");
	}	
	
	// Titre de recherche trop court
	const nia01b3_nodes = document.querySelectorAll('input[type="search"]');
	let nia01b3_flag = false;
	if(nia01b3_nodes && nia01b3_nodes.length > 0 && isItemsVisible(nia01b3_nodes)){
	  for(let i = 0; i < nia01b3_nodes.length; i++){
		if(nia01b3_nodes[i].hasAttribute("title") && nia01b3_nodes[i].getAttribute("title").length < 15){
			nia01b3_flag = true;
			setItemOutline(nia01b3_nodes[i],"orange","nia01b3","01-B");
		}
	  }
	}
	if(nia01b3_flag == true){
	   setItemToResultList("nth","<li><a href='#' data-destination='nia01b3' class='result-focus label-orange'>01-B</a> : Problème avec la pertinence du titre de la recherche</li>");
	}
	
	// Role search sur les recherches secondaires
	const nia01b4_nodes = document.querySelectorAll('main form[role="search"]:not([action$="recherche.html"]):not([aria-label="Globale"]):not([aria-label="Global"])');
	if(nia01b4_nodes && nia01b4_nodes.length > 0 && isItemsVisible(nia01b4_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01b4' class='result-focus label-yellow'>01-B</a> : Présence d'un role=search sur les éléments de recherche secondaire</li>");
	  setItemsOutline(nia01b4_nodes,"yellow","nia01b4","01-B");
	}
	
	// Les filtres sont présentés avec une structure en accordéon details/summary
	const nia01b5_nodes = document.querySelectorAll('.filters-content > *:not(details)');
	if(nia01b5_nodes && nia01b5_nodes.length > 0 && isItemsVisible(nia01b5_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01b5' class='result-focus label-yellow'>01-B</a> : Il est recommander de présenter les filtres avec une structure en accordéon details/summary</li>");
	  setItemsOutline(nia01b5_nodes,"yellow","nia01b5","01-B");
	}
	
	//Affichage du nombre de résultat
	const nia01b6_nodes = document.querySelectorAll('.search-meta-count');
	if(nia01b6_nodes && nia01b6_nodes.length > 0 && !isItemsVisible(nia01b6_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01b6' class='result-focus label-orange'>01-B</a> : Absence du nombre de resultat de la recherche</li>");
	  setItemsOutline(nia01b6_nodes,"orange","nia01b6","01-B");
	}
	
	// Les résultats sont présentés sous forme d’une suite de balise <article> ou <li>
	const nia01b7_nodes = document.querySelectorAll('.search-results .search-result > *:not(article):not(li)');
	if(nia01b7_nodes && nia01b7_nodes.length > 0 && isItemsVisible(nia01b7_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01b7' class='result-focus label-yellow'>01-B</a> : Les résultats doivent être présentés sous forme d’une suite de balise 'article' ou 'li'</li>");
	  setItemsOutline(nia01b7_nodes,"yellow","nia01b7","01-B");
	}
	
	// La pagination doit être structurée dans un élément <nav role=‘navigation’> avec un aria_label
	const nia01b8_nodes = document.querySelectorAll('nav:not([role="navigation"]) > :is(ol,ul).pagination, *:not(nav) > :is(ol,ul).pagination, nav:not([aria-label]) > :is(ol,ul).pagination');
	if(nia01b8_nodes && nia01b8_nodes.length > 0 && isItemsVisible(nia01b8_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01b8' class='result-focus label-red'>01-B</a> : La pagination doit être structurée dans un élément 'nav'  avec le role=navigation et un aria_label</li>");
	  setItemsOutline(nia01b8_nodes,"red","nia01b8","01-B");
	}
	
	//Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)
	const nia01b9_nodes = document.querySelectorAll('nav > .pagination:not(ol,ul)');
	if(nia01b9_nodes && nia01b9_nodes.length > 0 && isItemsVisible(nia01b9_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01b9' class='result-focus label-red'>01-B</a> : Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)</li>");
	  setItemsOutline(nia01b9_nodes,"red","nia01b9","01-B");
	}
	
	// La page active doit avoir un aria_current= ‘page’
	const nia01b10_nodes = document.querySelectorAll('.pagination .pagination-page');
	let nia01b10_flag = false;
	let nia01b11_counter = 0;
	if(nia01b10_nodes && nia01b10_nodes.length > 0 && isItemsVisible(nia01b10_nodes)){
		for(let i = 0; i < nia01b10_nodes.length; i++){
			if(nia01b10_nodes[i].tagName != 'LI') {setItemsOutline(nia01b10_nodes,"red","nia01b10","01-B");nia01b10_flag = true;}
			else if(!nia01b10_nodes[i].firstElementChild || (nia01b10_nodes[i].firstElementChild.tagName == 'A' && ( !nia01b10_nodes[i].firstElementChild.hasAttribute("aria-label") || nia01b10_nodes[i].firstElementChild.getAttribute("aria-label").length < 4))) {setItemsOutline(nia01b10_nodes,"red","nia01b10","01-B");nia01b10_flag = true;}
			if(nia01b10_nodes[i].hasAttribute("aria-current") && nia01b10_nodes[i].getAttribute("aria-current") == "page"){nia01b11_counter++;}
		}

		if(nia01b10_flag == true){
		   setItemToResultList("dev","<li><a href='#' data-destination='nia01b10' class='result-focus label-red'>01-B</a> : Les item de la pagination doivent être dans une balise li et leur enfant posseder un aria-label pertinent</li>");
		}
		if(nia01b11_counter == 0){
		   setItemToResultList("dev","<li><a href='#' data-destination='nia01b11' class='result-focus label-red'>01-B</a> : La page active de la pagination doit avoir un aria_current= ‘page’</li>");
		   setItemsOutline(nia01b10_nodes,"red","nia01b11","01-B");
		}
	}

	// C. Tooltip

	const nia01c_nodes = document.querySelectorAll('.search-view');
	if(nia01c_nodes && nia01c_nodes.length > 0 && isItemsVisible(nia01c_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia01c' class='result-focus label-red'>01-C</a> : Présence de tooltip non accessible sur les résultats de recherches [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-13-1' target='_blank'>RAWeb 10.13.1</a>]</li>");
	  setItemsOutline(nia01c_nodes,"red","nia01c","01-C");
	}

	// D. Menu langue

	if(!only_redactor){
		const nia01d1_nodes = document.querySelectorAll('nav[id^="language-"]:not([aria-label]), div > ul.cmp-languagenavigation__group:not([aria-label])');
		if(nia01d1_nodes && nia01d1_nodes.length > 0 && isItemsVisible(nia01d1_nodes)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia01d1' class='result-focus label-red'>01-D</a> : Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)</li>");
		  setItemsOutline(nia01d1_nodes,"red","nia01d1","01-D");
		}
		
		// Check vieux composant switch lang
		const nia01d2_nodes = document.querySelectorAll('#page-langs ul[role="menu"] > li[role="none"]');
		if(nia01d2_nodes && nia01d2_nodes.length > 0){
		  setItemToResultList("dev","<li><a href='#' data-destination='nia01d2' class='result-focus label-orange'>01-D</a> : Faiblesse de la structure du menu de switch des langues : ne pas utiliser role=menu</li>");
		  setItemsOutline(nia01d2_nodes,"orange","nia01d2","01-D");
		}
		
		// Les liens vers les versions linguistique doivent avoir l’attribut lang et posséder le title et le contenu textuel « de – Deutsch » 
		const nia01d3_nodes = document.querySelectorAll('.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([title*=" - "]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([lang]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([hreflang])');
		if(nia01d3_nodes && nia01d3_nodes.length > 0 && isItemsVisible(nia01d3_nodes)){
		  setItemToResultList("dev","<li><a href='#' data-destination='nia01d3' class='result-focus label-orange'>01-D</a> : Les liens vers les versions linguistique doivent avoir les attributs lang, hreflang et posséder un attribut title dont le contenu textuel est tel que : « de – Deutsch » </li>");
		  setItemsOutline(nia01d_nodes,"orange","nia01d3","01-D");
		}
	}


	// E. Video player

	const nia01e_nodes = document.querySelectorAll('.cmp-multiplayer .player_img img[alt="Lire la vidéo Youtube, voir légende ci-après"][lang]:not([lang="fr"])');
	if(nia01e_nodes && nia01e_nodes.length > 0 && isItemsVisible(nia01e_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01e' class='result-focus label-orange'>01-E</a> : Traduction manquante dans le composant Multimedia Player</li>");
	  setItemsOutline(nia01e_nodes,"orange","nia01e","01-E");
	}

	// F. Menu

	// F1. Check si le menu existe
	if(!only_redactor){
		const nia01f_menu = document.querySelector('nav.topnav > .page-headernav .navigation-container > ul.nav ,nav.page-headernav .navigation-container > ul.nav, nav.page-headernav-desk .navigation-container > ul.nav, nav.headernav-detached .navigation-container > ul.nav');
		let nia01f_hasPasserelle = false; 
		let nia01f_isModal = false; 
		if(nia01f_menu){
			const nia01f01_node = document.querySelector('nav#headernav:not([role="navigation"])');
			if(nia01f01_node && isItemVisible(nia01f01_node)){
			  setItemToResultList("dev","<li><a href='#' data-destination='nia01f01' class='result-focus label-orange'>01-F</a> : Role navigation absent de la barre de navigation</li>");
			  setItemsOutline(nia01f01_node,"orange","nia01f01","01-F");
			}
			const nia01f02_node = document.querySelector('nav#headernav:not([aria-label]):not([aria-labelledby])');
			if(nia01f02_node && isItemVisible(nia01f02_node)){
			  setItemToResultList("dev","<li><a href='#' data-destination='nia01f02' class='result-focus label-yellow'>01-F</a> : Attribut Aria-label absent de la barre de navigation</li>");
			  setItemsOutline(nia01f02_node,"yellow","nia01f02","01-F");
			}

			// Check si un acces aux pages passerelles est disponible depuis la navigation
			const nia01f03_node = nia01f_menu.querySelector(':scope > li.has-subnav > a');
			if(nia01f03_node){
				nia01f_hasPasserelle = true;
				if(debug_flag) console.log(" - Le menu utilise des pages passerelles");
			}
			else{
				if(debug_flag) console.log(" - Le menu n'utilise pas de pages passerelles");
			}
			
			// Itération sur les items du menu
			const nia01f10_nodes = nia01f_menu.querySelectorAll(':scope > li');
			let nia01f_list21 = "", nia01f_list22 = "",nia01f_list23 = "",nia01f_list24 = "",nia01f_list31 = "", nia01f_list32 = "",nia01f_list33 = "",nia01f_list34 = "",nia01f_list41 = "", nia01f_list42 = "",nia01f_list43 = "",nia01f_list44 = "";
			if(nia01f10_nodes && nia01f10_nodes.length > 0){
				for(let i = 0; i < nia01f10_nodes.length; i++){
					if(isItemVisible(nia01f10_nodes[i])){
						let nia01f11_nodes = nia01f10_nodes[i].querySelectorAll(':scope > a, :scope > .quick-navigation > a');
						let nia01f12_nodes = nia01f10_nodes[i].querySelectorAll(':scope > button, :scope > .disclosure--container > button');
						let nia01f13_nodes = nia01f10_nodes[i].querySelectorAll(':scope > ul, :scope > .disclosure--container > ul');
						let iplusun = i+1; 
						if(nia01f10_nodes[i].classList.contains("has-subnav")){
							
							// F2. Avec accès aux pages passerelles depuis la navigation: 
							// Sur l'item de rubrique vérifier existance de (li.has-subnav > a) et de (li.has-subnav > button) + le button doit avoir l'attribut aria-expanded
							if(nia01f_hasPasserelle){
								if(!nia01f11_nodes || nia01f11_nodes.length != 1){
									if(debug_flag) console.log(" - F2.1 Absence de lien pour se rendre à la page passerelle pour l'élément de menu n°"+iplusun);
									nia01f_list21 += iplusun+",";
									setItemOutline(nia01f10_nodes[i],"orange","nia01f21","01-F"); 
								}
								else if(!nia01f12_nodes || nia01f12_nodes.length != 1){
									if(debug_flag) console.log(" - F2.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°"+iplusun);
									nia01f_list22 += iplusun+",";
									setItemOutline(nia01f10_nodes[i],"orange","nia01f22","01-F"); 
								}
								else if(!nia01f13_nodes || nia01f13_nodes.length !=1){
									if(debug_flag) console.log(" - F2.3 Un problème a été detecté pour l'élement de menu n°"+iplusun+" (absence de sous-menu alors que la classe has-subnav est présente)");
									nia01f_list23 += iplusun+",";
									setItemOutline(nia01f10_nodes[i],"orange","nia01f23","01-F"); 
								}
								else if(nia01f12_nodes && !nia01f12_nodes[0].hasAttribute("aria-expanded")){
									if(debug_flag) console.log(" - F2.4 Un problème a été detecté pour l'élement de menu n°"+iplusun+" (absence de l'attribut aria-expanded)");
									nia01f_list24 += iplusun+",";
									setItemOutline(nia01f10_nodes[i],"orange","nia01f24","01-F"); 
								}
								else{
									if(debug_flag) console.log(" - L'item de menu "+iplusun+" avec page passerelles et sous-menu est OK")
								}
							}

							// F3. Sans l’accès aux pages passerelles depuis la navigation:
							// Sur l'item de rubrique vérifier existance de (li.has-subnav > button) + cette item doit avoir l'attribut aria-expanded
							else{
								if(nia01f11_nodes && nia01f11_nodes.length > 0){
									if(debug_flag) console.log(" - F3.1 Présence d'un lien pour se rendre à une page passerelle sur l'élement de menu n°"+iplusun);
									nia01f_list31 += iplusun+",";
									setItemOutline(nia01f10_nodes[i],"orange","nia01f31","01-F"); 
								}
								else if(!nia01f12_nodes || nia01f12_nodes.length != 1){
									if(debug_flag) console.log(" - F3.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°"+iplusun);
									nia01f_list32 += iplusun+",";
									setItemOutline(nia01f10_nodes[i],"orange","nia01f32","01-F"); 
								}
								else if(!nia01f13_nodes || nia01f13_nodes.length !=1){
									if(debug_flag) console.log(" - F3.3 Un problème a été detecté pour l'élement de menu n°"+iplusun+" (absence de sous-menu alors que la classe has-subnav est présente)");
									nia01f_list33 += iplusun+",";
									setItemOutline(nia01f10_nodes[i],"orange","nia01f33","01-F"); 
								}
								else if(nia01f12_nodes && !nia01f12_nodes[0].hasAttribute("aria-expanded")){
									if(debug_flag) console.log(" - F3.4 Un problème a été detecté pour l'élement de menu n°"+iplusun+" (absence de l'attribut aria-expanded)");
									nia01f_list34 += iplusun+",";
									setItemOutline(nia01f10_nodes[i],"orange","nia01f34","01-F"); 
								}
								else{
									if(debug_flag) console.log(" - L'item de menu "+iplusun+" sans page passerelles et sous-menu est OK")
								}
							}
						}
						else {
							// F4 Vérifier que les élements (li:not(.has-subnav) > a) n'ont pas d'attribut aria-expanded ni aria-haspopup ni est suivi d'un élément ul
							if(!nia01f11_nodes || nia01f11_nodes.length != 1){
								if(debug_flag) console.log(" - F4.1 Un problème a été detecté pour l'élement de menu n°"+iplusun);
								nia01f_list41 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f41","01-F"); 
							}
							else if(nia01f12_nodes && nia01f12_nodes.length > 0){
								if(debug_flag) console.log(" - F4.2 Un problème a été detecté pour l'élement de menu n°"+iplusun);
								nia01f_list42 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f42","01-F"); 
							}
							else if(nia01f13_nodes && nia01f13_nodes.length > 0){
								if(debug_flag) console.log(" - F4.3 Un problème a été detecté pour l'élement de menu n°"+iplusun);
								nia01f_list43 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f43","01-F"); 
							}
							else if(nia01f11_nodes && (nia01f11_nodes[0].hasAttribute("aria-expanded") || nia01f11_nodes[0].hasAttribute("aria-haspopup"))){
								if(debug_flag) console.log(" - F4.4 Un problème a été detecté pour l'élement de menu n°"+iplusun);
								nia01f_list44 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f44","01-F"); 
							}
							else{
								if(debug_flag) console.log(" - L'item de menu "+iplusun+" sans sous-menu est OK")
							}
						}
					}
				}
				
				if(nia01f_list21 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f21' class='result-focus label-orange'>01-F</a> Absence de lien pour se rendre à la page passerelle <span class='cy-hidden'>pour l'élément de menu n°"+nia01f_list21.slice(0,-1)+"</span></li>");
				}
				if(nia01f_list22 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f22' class='result-focus label-orange'>01-F</a> : Absence de bouton pour déplier le sous-menu<span class='cy-hidden'> pour l'élement de menu n°"+nia01f_list22.slice(0,-1)+"</span></li>");
				}
				if(nia01f_list23 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f23' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list23.slice(0,-1)+"</span>: absence de sous-menu alors que la classe has-subnav est présente</li>");
				}
				if(nia01f_list24 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f24' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list24.slice(0,-1)+"</span>: absence de l'attribut aria-expanded</li>");
				}
				if(nia01f_list31 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f31' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list31.slice(0,-1)+"</span>: conflit sur le lien pour aller sur la page passerelle</li>");
				}
				if(nia01f_list32 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f32' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list32.slice(0,-1)+"</span>: absence de bouton pour déplier le sous-menu</li>");
				}
				if(nia01f_list33 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f33' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list33.slice(0,-1)+"</span>: absence de sous-menu alors que la classe has-subnav est présente)</li>");
				}
				if(nia01f_list34 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f34' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list34.slice(0,-1)+"</span>: absence de l'attribut aria-expanded</li>");
				}
				if(nia01f_list41 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f41' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list41.slice(0,-1)+"</span>: absence de lien pour acceder aux pages passerelle.</li>");
				}
				if(nia01f_list42 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f42' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list42.slice(0,-1)+"</span>: remplacer les boutons par des liens de navigation</li>");
				}
				if(nia01f_list43 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f43' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list43.slice(0,-1)+"</span>: un item du menu sans sous-menu contient une liste ul</li>");
				}
				if(nia01f_list44 != ""){
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f44' class='result-focus label-orange'>01-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°"+nia01f_list44.slice(0,-1)+"</span>: présence d'attributs aria-expanded ou aria-haspopup sur un item du menu</li>");
				}
			}
					
			// On resize pour voir le menu (Attention certain attributs sont ajouté en JS)
			// window.resizeTo(320, 500);
			// document.body.style.zoom = "400%";
			
				// Check si le menu mobile s'ouvre en disclosure ou en modale
				const nia01f20_btn = document.querySelector('.topnav > button.anchor.anchor-scroll, .page-headernav > button.anchor.anchor-scroll, .page-headernavmobile > button.anchor.anchor-scroll');
				if(nia01f20_btn && isItemVisible(nia01f20_btn)){
					const nia01f20_btnText = nia01f20_btn.innerText;
					const nia01f20_btnDest = nia01f20_btn.getAttribute("data-destination");
					const nia01f30_Dest = document.querySelector(nia01f20_btnDest);
					
					if(!nia01f20_btn.hasAttribute("aria-expanded")){
						nia01f_isModal = true;
						if(debug_flag) console.log(" - Le menu mobile s'ouvre dans une modale");
						
						if(!nia01f20_btn.hasAttribute("aria-haspopup")){
							if(debug_flag) console.log(" - F5.1 : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f51' class='result-focus label-yellow'>01-F</a> : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu</li>");
							setItemOutline(nia01f20_btn,"yellow","nia01f51","01-F");
						}
					}
					else{
						if(debug_flag) console.log(" - Le menu mobile s'ouvre dans un disclosure");
						
						if(nia01f20_btn.getAttribute("aria-expanded") == true){
							if(debug_flag) console.log(" - F5.2 : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f52' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu</li>");
							setItemOutline(nia01f20_btn,"red","nia01f52","01-F");
						}
						
						if(Boolean(nia01f30_Dest.closest('[role="dialog"]')) || Boolean(nia01f30_Dest.closest('[aria-modal="true"]'))){
							if(debug_flag) console.log(" - F5.3 : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f53' class='result-focus label-red'>01-F</a> : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f53","01-F");
						}
						
						if(nia01f20_btn.hasAttribute("aria-haspopup")){
							if(debug_flag) console.log(" - F5.4 : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f54' class='result-focus label-red'>01-F</a> : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu</li>");
							setItemOutline(nia01f20_btn,"red","nia01f54","01-F");
						}
					}
					if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") == false){
						if(debug_flag) console.log(" - F5.5 : Vocalisation du menu caché en mobile");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f55' class='result-focus label-red'>01-F</a> : Vocalisation du menu caché en mobile</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f55","01-F");
					}
				
					// On click sur le bouton pour ouvrir le menu (s'il n'est pas déjà ouvert)
					if(!isItemVisible(nia01f30_Dest)) nia01f20_btn.click();
					
					const lang = nia01f20_btn.closest('[lang]').getAttribute('lang');
					
					if(sanitizeText(nia01f20_btn.innerText) != sanitizeText(nia01f20_btnText)){
						if(debug_flag) console.log(" - F6.1 Attention le texte du bouton d'ouverture du menu à changé cela ne devrai pas être le cas");
						if(debug_flag) console.log(nia01f20_btn.innerText);
						if(debug_flag) console.log(nia01f20_btnText);
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f61' class='result-focus label-red'>01-F</a> : Attention le texte du bouton d'ouverture du menu change à l'ouverture du menu cela ne devrai pas être le cas</li>");
						setItemOutline(nia01f20_btn,"red","nia01f61","01-F");
					}
					
					if(nia01f_isModal){
						// une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" aria-modal="true" role="dialog" aria-label="Menu principal"
						if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") != "false"){
							if(debug_flag) console.log(" - F6.2 Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert");
							if(debug_flag) console.log(nia01f30_Dest.getAttribute("aria-hidden"));
							if(debug_flag) console.log(nia01f30_Dest.getAttribute("aria-hidden") != "false");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f62' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f62","01-F");
						}
						
						if(!nia01f30_Dest.hasAttribute("aria-modal") || nia01f30_Dest.getAttribute("aria-modal") != "true"){
							if(debug_flag) console.log(" - F6.3 Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert");
							if(debug_flag) console.log(!nia01f30_Dest.hasAttribute("aria-modal"));
							if(debug_flag) console.log(nia01f30_Dest.getAttribute("aria-modal") != "true");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f63' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f63","01-F");
						}
						
						if(!nia01f30_Dest.hasAttribute("role") || nia01f30_Dest.getAttribute("role") != "dialog"){
							if(debug_flag) console.log(" - F6.4 Erreur dans la valeur de l'attribut role du menu modal ouvert");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f64' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut role du menu modal ouvert</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f64","01-F");
						}
						
						if(!(nia01f30_Dest.hasAttribute("aria-label") || nia01f30_Dest.hasAttribute("aria-labelledby"))){
							if(debug_flag) console.log(" - F6.5 Erreur dans la valeur de l'attribut aria-label du menu modal ouvert");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f65' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-label du menu modal ouvert</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f65","01-F");
						}
						// le premier élément de cette modale est un button.anchor-close
						if(nia01f30_Dest.firstChild.tagName == 'BUTTON' && nia01f30_Dest.firstChild.className.contains("anchor-close")){
							if(debug_flag) console.log(" - F6.6 Erreur au niveau du bouton close du menu modal ouvert");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f66' class='result-focus label-red'>01-F</a> : Erreur au niveau du bouton close du menu modal ouvert</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f66","01-F");
						}
					}
					else{
						// une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" - Absence de aria-modal="true" role="dialog"
						if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") != false){
							if(debug_flag) console.log(" - F6.7 Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f67' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f67","01-F");
						}
						
						if(nia01f30_Dest.hasAttribute("aria-modal") && nia01f30_Dest.getAttribute("aria-modal") == true){
							if(debug_flag) console.log(" - F6.8 Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f68' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f68","01-F");
						}
						
						if(nia01f30_Dest.hasAttribute("role") && nia01f30_Dest.getAttribute("role") == "dialog"){
							if(debug_flag) console.log(" - F6.9 Erreur dans la valeur de l'attribut role du menu disclosure ouvert");
							setItemToResultList("dev","<li><a href='#' data-destination='nia01f69' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut role du menu disclosure ouvert</li>");
							setItemOutline(nia01f30_Dest,"red","nia01f69","01-F");
						}
					}
					
					nia01f20_btn.click();
				}
			//window.resizeTo(currentWidth, currentHeight);

			// G Structure globale du menu
	
			const nia01g1_nodes = document.querySelectorAll('nav#headernav .nav--primary:not(ul), nav#headernav ul.nav--primary > .nav-item:not(li), nav#headernav ul.nav--primary > li.nav-item.has-subnav .subnav-item:not(li)');
			if(nia01g1_nodes && nia01g1_nodes.length > 0){
			  setItemToResultList("dev","<li><a href='#' data-destination='nia01g1' class='result-focus label-red'>01-G</a> : Les items du menu et du sous menu sont sous forme de liste ul/li</li>");
			  setItemsOutline(nia01g1_nodes,"red","nia01g1","01-G");
			}

			const nia01g2_nodes = document.querySelectorAll('nav#headernav :is(a,button)');
			let nia01g2_flag = false;
			if(nia01g2_nodes && nia01g2_nodes.length > 0){
			  for(let i = 0; i < nia01g2_nodes.length; i++){
				  if(!nia01g2_nodes[i].textContent || nia01g2_nodes[i].textContent == ""){
					  nia01g2_flag = true;
					  setItemsOutline(nia01g2_nodes,"red","nia01g2","01-G");
				  }
			  }
			}
			if(nia01g2_flag == true){
				 setItemToResultList("dev","<li><a href='#' data-destination='nia01g2' class='result-focus label-red'>01-G</a> : Les éléments du menu et des sous_menus doivent avoir un intitulé </li>");
			}
			
			const nia01g3_nodes = document.querySelectorAll('nav#headernav li a');
			let nia01g3_items;
			let nia01g3_flag = false;
			let nia01g4_flag = false; 
			let nia01g5_counter = 0; 			
			if(nia01g3_nodes && nia01g3_nodes.length > 0){
			  for(let i = 0; i < nia01g3_nodes.length; i++){
				  if(nia01g3_nodes[i].hasAttribute("aria-current")){
					  if(nia01g3_nodes[i].getAttribute("aria-current") == 'page'){
						  nia01g5_counter++;
						  if(nia01g3_nodes[i].parentElement.classList.contains("subnav-item")){
							if(!nia01g3_nodes[i].parentElement.closest("has-subnav") || !nia01g3_nodes[i].parentElement.closest("has-subnav").firstElementChild.hasAttribute("aria-current") ||  nia01g3_nodes[i].parentElement.closest("has-subnav").firstElementChild.hasAttribute("aria-current") != 'true'){
								nia01g3_flag = true;
								setItemsOutline(nia01g3_nodes[i],"red","nia01g3","01-G");
							}
						  }  
					  }
					  else if(nia01g3_nodes[i].getAttribute("aria-current") == 'true'){
						  nia01g3_items = nia01g3_nodes[i].querySelectorAll('a[aria-current="page"]');
						  if(!nia01g3_items || nia01g3_items.length != 1){
							nia01g4_flag = true;
							setItemsOutline(nia01g3_nodes[i],"red","nia01g4","01-G");
						  }
					  }
				  }
			  }
			}

			if(nia01g3_flag == true){
				 setItemToResultList("dev","<li><a href='#' data-destination='nia01g3' class='result-focus label-red'>01-G</a> : Les pages parentes de la page courante doivent avoir un attribut aria_current= 'true' </li>");
			}
			if(nia01g4_flag == true){
				 setItemToResultList("dev","<li><a href='#' data-destination='nia01g4' class='result-focus label-red'>01-G</a> : Une des pages enfant d'un menu actif doit avoir un attribut aria_current= 'page' </li>");
			}
			if(nia01g5_counter > 1){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01g4' class='result-focus label-red'>01-G</a> : Il ne peut y avoir qu'un seul élément dans le menu avec l'attribut aria-current=page </li>");
			}

			
		}
		else {
			  setItemToResultList("man","<li><span class='result-focus label-yellow'>01-F</span> : Absence de barre de navigation</li>");
		}
	}
	
}
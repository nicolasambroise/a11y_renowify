/* Script Check A11Y Renowify - Nicolas AMBROISE */

// Current URL
let currentUrl = window.location.href;
let homepage = document.querySelector('h1.logo.logo--homepage');
let homepageException = ["https://guichet.public.lu/fr/citoyens.html", "https://guichet.public.lu/fr/entreprises.html","https://guichet.public.lu/fr/leichte-sprache.html", "https://guichet.public.lu/en/citoyens.html", "https://guichet.public.lu/en/entreprises.html","https://guichet.public.lu/en/leichte-sprache.html","https://guichet.public.lu/de/citoyens.html", "https://guichet.public.lu/de/entreprises.html","https://guichet.public.lu/de/leichte-sprache.html","https://cepas.public.lu/fr/espace-public.html"]

let isHomepage = false; // True s'il s'agit de la homepage du site
let isPreview = false; // True s'il s'agit d'un environnement de dev (LOCAL, BUILD, INTEGR, QUAL)
let isDecla = false; // True s'il s'agit de la page contenant la declaration d'accessibilité
let isSitemap = false; // True s'il s'agit de la page contenant le plan du site
let isPrototype = false; // True s'il s'agit de la page prototype / atelier graphique
let isAEM = false; // True s'il s'agit d'un site réalisé avec AEM
let isCTIE = false; // True s'il s'agit d'un site hébergé par le CTIE
let isSearchLogic = false; // True s'il s'agit d'une page présentant des résultats de recherche

if(homepage || homepageException.includes(currentUrl)) {isHomepage = true;}
if((currentUrl.includes("preview-") || currentUrl.includes("wcm")) && currentUrl.includes(".etat.lu")){isPreview = true;}
else if(currentUrl.includes("aem-test-")){isPreview = true;}
if(currentUrl.includes("/prototype/")){isPrototype = true;}
if(currentUrl.includes("/actualites.html") || currentUrl.includes("/publications.html") || currentUrl.includes("/recherche.html")){isSearchLogic = true;}
if(currentUrl.includes("/support/accessibilite.html") || currentUrl.includes("/support/accessibilite/accessibilite-guichet.html")){isDecla = true;}
if(currentUrl.includes("plan-du-site.html") || currentUrl.includes("plan.html") || currentUrl.includes("plan-site.html")){isSitemap = true;}

if(currentUrl.includes(".public.lu") || currentUrl.includes("gouvernement.lu") || currentUrl.includes(".etat.lu") || currentUrl.includes("sig-gr.eu") || currentUrl.includes(".mae.lu") || currentUrl.includes("lu-alert.lu")){
  isCTIE = true;
  if(!currentUrl.includes("fpgun-jway") && !currentUrl.includes("demarches.services-publics") && !currentUrl.includes("fpgun-preintegr") && !currentUrl.includes("services-publics-test") && !currentUrl.includes("accessibilite.public")){
	isAEM = true;
  }
}
else{
	alert("Ce Bookmarklet est à utiliser seulement sur les sites étatiques luxembourgeois.");
}

// Current Size
let currentWidth = window.innerWidth;
let currentHeight = window.innerHeight;

// Init result message
let result_crit = "";
let result_nc = "";
let result_nth = "";
let result_dev = "";
let result_man = "";
let result_crit_nb = "";
let result_nc_nb = "";
let result_nth_nb = "";
let result_dev_nb = "";
let result_man_nb = "";
let result_html5 = "";
let result_wave = "";
let result_lighthouse = "";


// Init Var
let debug_flag = false;
let only_redactor = false;
let only_error = false;
let save_to_db = false;



function run_renowify(df,or,oe,std,pluginUrl){
	
	/*- -------------------------------------------------------------------------------- */
	/* Pre-processing */

	// clean console
	console.clear();
	
	console.log("== Init Plugin Renowify")

	if(df != null) debug_flag = df;
	if(or != null) only_redactor = or;
	if(oe != null) only_error = oe;
	if(std != null) save_to_db = std;
	
	// Check Page
	if(isHomepage) console.log("$ isHomepage");
	if(isPreview) console.log("$ isPreview");
	if(isDecla) console.log("$ isDecla");
	if(isSitemap) console.log("$ isSitemap");
	if(isPrototype) console.log("$ isPrototype");
	if(isAEM) console.log("$ isAEM");
	if(isCTIE) console.log("$ isCTIE");
	if(isSearchLogic) console.log("$ isSearchLogic");
	
	
	// Reset
	result_crit = "";
	result_nc = "";
	result_nth = "";
	result_dev = "";
	result_man = "";
	result_crit_nb = "";
	result_nc_nb = "";
	result_nth_nb = "";
	result_dev_nb = "";
	result_man_nb = "";
	result_html5 = "";
	result_wave = "";
	result_lighthouse = "";

	/*- -------------------------------------------------------------------------------- */
	// Add JS
	// - double sécurité pour que ce sript puisse également être appelé par l'extention chrome
	if(!document.body.classList.contains('renowify-script-injected')){
		/* Pour le bookmarklet */
		console.log("== Start Bookmarklet Renowify ==");
		loadStyle(pluginUrl)
		var functions_loaded = loadScript('functions', '/scripts/features/nia_functions.js',pluginUrl);
		var resultpanel_loaded = loadScript('resultpanel', '/scripts/features/nia_resultpanel.js',pluginUrl);
		var thirdservices_loaded = loadScript('thirdservices', '/scripts/features/nia_thirdservices.js',pluginUrl);
		var p01_loaded = loadScript('p01', '/scripts/parts/nia01_colors.js',pluginUrl);
		var p02_loaded = loadScript('p02', '/scripts/parts/nia02_images.js',pluginUrl);
		var p03_loaded = loadScript('p03', '/scripts/parts/nia03_links.js',pluginUrl);
		var p04_loaded = loadScript('p04', '/scripts/parts/nia04_form.js',pluginUrl);
		var p05_loaded = loadScript('p05', '/scripts/parts/nia05_obligatoire.js',pluginUrl);
		var p06_loaded = loadScript('p06', '/scripts/parts/nia06_structure.js',pluginUrl);
		var p07_loaded = loadScript('p07', '/scripts/parts/nia07_config.js',pluginUrl);
		var p08_loaded = loadScript('p08', '/scripts/parts/nia08_table.js',pluginUrl);
		var p09_loaded = loadScript('p09', '/scripts/parts/nia09_nav.js',pluginUrl);
		var p10_loaded = loadScript('p10', '/scripts/parts/nia10_oldtag.js',pluginUrl);
		var p11_loaded = loadScript('p11', '/scripts/parts/nia11_lang.js',pluginUrl);
		var p12_loaded = loadScript('p12', '/scripts/parts/nia12_button.js',pluginUrl);
		var p13_loaded = loadScript('p13', '/scripts/parts/nia13_lottie.js',pluginUrl);
		var p14_loaded = loadScript('p14', '/scripts/parts/nia14_title.js',pluginUrl);
		var p15_loaded = loadScript('p15', '/scripts/parts/nia15_secu.js',pluginUrl);
		
		Promise.all([functions_loaded,resultpanel_loaded,thirdservices_loaded,p01_loaded,p02_loaded,p03_loaded,p04_loaded,p05_loaded,p06_loaded,p07_loaded,p08_loaded,p09_loaded,p10_loaded,p11_loaded,p12_loaded,p13_loaded,p14_loaded,p15_loaded])
		.then(function() {setTimeout(beforeCheck(), 100);})
		.then(function() {
			
			var p01 = new Promise(function(resolve) {check_part_01();setTimeout(resolve, 100);});
			var p02 = new Promise(function(resolve) {check_part_02();setTimeout(resolve, 100);});
			var p03 = new Promise(function(resolve) {check_part_03();setTimeout(resolve, 100);});
			var p04 = new Promise(function(resolve) {check_part_04();setTimeout(resolve, 100);});
			var p05 = new Promise(function(resolve) {check_part_05();setTimeout(resolve, 100);});
			var p06 = new Promise(function(resolve) {check_part_06();setTimeout(resolve, 100);});
			var p07 = new Promise(function(resolve) {check_part_07();setTimeout(resolve, 100);});
			var p08 = new Promise(function(resolve) {check_part_08();setTimeout(resolve, 100);});
			var p09 = new Promise(function(resolve) {check_part_09();setTimeout(resolve, 100);});
			var p10 = new Promise(function(resolve) {check_part_10();setTimeout(resolve, 100);});
			var p11 = new Promise(function(resolve) {check_part_11();setTimeout(resolve, 100);});
			var p12 = new Promise(function(resolve) {check_part_12();setTimeout(resolve, 100);});
			var p13 = new Promise(function(resolve) {check_part_13();setTimeout(resolve, 100);});
			var p14 = new Promise(function(resolve) {check_part_14();setTimeout(resolve, 100);});
			var p15 = new Promise(function(resolve) {check_part_15();setTimeout(resolve, 100);});
			
			Promise.all([p01,p02,p03,p04,p05,p06,p07,p08,p09,p10,p11,p12,p13,p14,p15])
			.then(function() {setTimeout(createResultPanel(), 100);})
			.then(function() {setTimeout(thirdPartValidation(), 100);})
			.then(function() {setTimeout(activateCheckA11YPanel(), 100);});
		})
		.then(function() {console.log("== End Bookmarklet Renowify ==");});
	
	}
	else{
		console.log("== Start Plugin Renowify ==");
		
		beforeCheck();
		/* Pour le Plugin (les script sont appelé dans le fichier sw_chrome.js) */ 
		var part01 = new Promise(function(resolve) {check_part_01();setTimeout(resolve, 100);});
		var part02 = new Promise(function(resolve) {check_part_02();setTimeout(resolve, 100);});
		var part03 = new Promise(function(resolve) {check_part_03();setTimeout(resolve, 100);});
		var part04 = new Promise(function(resolve) {check_part_04();setTimeout(resolve, 100);});
		var part05 = new Promise(function(resolve) {check_part_05();setTimeout(resolve, 100);});
		var part06 = new Promise(function(resolve) {check_part_06();setTimeout(resolve, 100);});
		var part07 = new Promise(function(resolve) {check_part_07();setTimeout(resolve, 100);});
		var part08 = new Promise(function(resolve) {check_part_08();setTimeout(resolve, 100);});
		var part09 = new Promise(function(resolve) {check_part_09();setTimeout(resolve, 100);});
		var part10 = new Promise(function(resolve) {check_part_10();setTimeout(resolve, 100);});
		var part11 = new Promise(function(resolve) {check_part_11();setTimeout(resolve, 100);});
		var part12 = new Promise(function(resolve) {check_part_12();setTimeout(resolve, 100);});
		var part13 = new Promise(function(resolve) {check_part_13();setTimeout(resolve, 100);});
		var part14 = new Promise(function(resolve) {check_part_14();setTimeout(resolve, 100);});
		var part15 = new Promise(function(resolve) {check_part_15();setTimeout(resolve, 100);});

		Promise.allSettled([part01,part02,part03,part04,part05,part06,part07,part08,part09,part10,part11,part12,part13,part14,part15])
		.then((results) => {
			results.forEach((result,index) => {
				let newi = ("0"+(index+1)).slice(-2);
				console.log("- Part"+newi+" : "+result.status);
			});
		})
		.then(function() {setTimeout(createResultPanel(), 100);})
		.then(function() {setTimeout(thirdPartValidation(), 100);})
		.then(function() {setTimeout(activateCheckA11YPanel(), 100);})
		.then(function() {console.log("== End Plugin Renowify ==");});
	

	}
}

// END
/*- -------------------------------------------------------------------------------- */

// fonction pour charger les scripts
function loadScript(id,src,pluginUrl) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
	script.id = 'injected-js-'+id;
	script.src = pluginUrl + src + '?v=' + Date.now();

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

	if (document.getElementById('injected-js-'+id) === null) document.head.append(script);
  });
}

// fonction pour charger le style
function loadStyle(pluginUrl) {
  return new Promise(function(resolve, reject) {
    let style = document.createElement('link');
    style.id = 'injected-css';
    style.rel = 'stylesheet';
    style.href = pluginUrl+ '/styles/stylePanel.css?v=' + Date.now();

    style.onload = () => resolve(style);
    style.onerror = () => reject(new Error(`Style load error`));

	if (document.getElementById('injected-css') === null) document.head.append(style);
  });
}

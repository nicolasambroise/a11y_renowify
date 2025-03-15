/* Script Check A11Y Renowify - Nicolas AMBROISE */

// ===== Globals
// Stockage
if(chrome.storage.local.get(["renowifyData"]) == undefined){
	console.log("initialise local storage")
	chrome.storage.local.set({renowifyData:{}});
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {	    
	const currentTabId = tabs[0].id
	chrome.storage.local.get(["renowifyData"], function(result){
	  console.log(result);
	  if(result.renowifyData != undefined){
		if(result.renowifyData["renowify_btn"] != undefined){
		  const renowify_btn = document.getElementById('renowify_btn');
		  
		  chrome.scripting.executeScript({
				func : checkPanelInjected,
				target : {tabId : currentTabId}
		  }).then(isPanelInjected  => {
		  
			  console.log("Panel déjà présent : "+isPanelInjected[0].result);
			  
			  if(isPanelInjected[0].result){	  	  
				  if(result.renowifyData["renowify_btn"]){
					renowify_btn.setAttribute('checked', true);
					renowify_btn.setAttribute('aria-pressed', true);
				  }
				  else{
					renowify_btn.removeAttribute('checked')
					renowify_btn.setAttribute('aria-pressed', false);
				  }
			  }
			  else{
				  let renowifyDataObject = result.renowifyData
				  renowifyDataObject["renowify_btn"] = false;
				  chrome.storage.local.set({renowifyData:renowifyDataObject});
			  }
		  });
		}
		if(result.renowifyData["renowify_type"] != undefined){
		  const renowify_selected = document.getElementById('radio_'+result.renowifyData["renowify_type"]);
		  renowify_selected.setAttribute('checked', true);
		}
		retrieveSwitchState(result.renowifyData, currentTabId);
	  }
	})
})	  

function checkPanelInjected(){
	if(document.body.classList.contains("panel-injected")) return true;
	return false
}

const scriptFolder = 'scripts/'
const styleFolder = 'styles/'

// ===== Renowify	  
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {	    
	const currentTabId = tabs[0].id
	const renowify_btn = document.getElementById('renowify_btn');

	renowify_btn.addEventListener('click', (event) => {
		renowify_btn.setAttribute('aria-pressed', renowify_btn.getAttribute("aria-pressed") === 'true' ? 'false' : 'true');
		
		const checked = renowify_btn.checked;
		console.log("checked : "+checked)
		
		const selected = document.querySelector('input[name="renowify_type"]:checked').value;
		console.log("selected : "+selected)
		
		chrome.storage.local.get(["renowifyData"], function(result){
			console.log(result);
			if(result.renowifyData != undefined){
				let renowifyDataObject = result.renowifyData
				renowifyDataObject["renowify_btn"] = checked;
				renowifyDataObject["renowify_type"] = selected;
				chrome.storage.local.set({renowifyData:renowifyDataObject});
			}
		});		
		
		// Show Panel
		if(checked){	
			console.log("Run Renowify : script_"+selected+".js");
			
			const p1 = chrome.scripting.executeScript({
				files: [scriptFolder+'/parts/nia01_colors.js',scriptFolder+'/parts/nia02_images.js',scriptFolder+'/parts/nia03_links.js',scriptFolder+'/parts/nia04_form.js',scriptFolder+'/parts/nia05_obligatoire.js',scriptFolder+'/parts/nia06_structure.js',scriptFolder+'/parts/nia07_config.js',scriptFolder+'/parts/nia08_table.js',scriptFolder+'/parts/nia09_nav.js',scriptFolder+'/parts/nia10_oldtag.js',scriptFolder+'/parts/nia11_lang.js',scriptFolder+'/parts/nia12_button.js',scriptFolder+'/parts/nia13_lottie.js',scriptFolder+'/parts/nia14_title.js',scriptFolder+'/parts/nia15_secu.js',scriptFolder+'/parts/nia_functions.js',scriptFolder+'/parts/nia_resultpanel.js',scriptFolder+'/parts/nia_savebdd.js',scriptFolder+'/parts/nia_savedecla.js',scriptFolder+'/parts/nia_thirdservices.js',scriptFolder+'/renowify.js'],
				target: { tabId: currentTabId }
			});
			const p2 = chrome.scripting.insertCSS({
				files: [styleFolder+'/stylePanel.css'],
				target: { tabId: currentTabId }
			});
			const p3 = chrome.scripting.executeScript({
				func : addClassToBody,
				target : {tabId : currentTabId}
			});
			const p4 = addBadge(currentTabId)
			const p5 = chrome.scripting.executeScript({
				files: [scriptFolder+'/script_'+selected+'.js'],
				target: { tabId: currentTabId }
			});
			
			Promise.all([p1, p2, p3]).then(p4).then(() => console.log("script & style injected"));
		}
		// Hide/Remove Panel
		else{
			console.log("Stop Renowify");
			const s1 = chrome.scripting.removeCSS({
				files: [styleFolder+'/stylePanel.css'],
				target: { tabId: currentTabId }
			});
			const s2 = chrome.scripting.executeScript({
				target : {tabId : currentTabId},
				func : removeClassToBody
			});
			const s3 = chrome.scripting.executeScript({
				target : {tabId : currentTabId},
				func : cleanRenowify
			});
			const s4 = removeBadge(currentTabId);
			Promise.all([s1,s2,s3]).then(s4).then(() => console.log("style removed"));
		}
	});
	
	const renowify = document.querySelectorAll('input[name="renowify_type"]').forEach(el => {
		el.addEventListener('change', (event) => {
			if(renowify_btn.checked) renowify_btn.click();
			else{
				let selected = event.target.value;
				chrome.storage.local.get(["renowifyData"], function(result){
					console.log(result);
					if(result.renowifyData != undefined){
						let renowifyDataObject = result.renowifyData
						renowifyDataObject["renowify_btn"] = false;
						renowifyDataObject["renowify_type"] = selected;
						chrome.storage.local.set({renowifyData:renowifyDataObject});
					}
				});	
			}	
		});
	});
 });

// Ajoute une classe au <body> pour eviter de relancer le script si le plugin est appelé plusieurs fois
function addClassToBody() {
  document.body.classList.add("panel-injected");
}
function removeClassToBody() {
  document.body.classList.remove("panel-injected");
}
function cleanRenowify() {
  document.getElementById('checkA11YPanel').remove();
  document.getElementById('checkA11YPanelBtn').remove();
  document.querySelectorAll('.checkA11YSpan').forEach(el => el.remove())
  document.querySelectorAll('[class^=checkA11YSpan]').forEach(el => {
	  for(let i = 0; i < el.classList.length; i++) {
		const className = el.classList[i];
		if(className.startsWith('checkA11YSpan') || className.startsWith('nia')) el.classList.remove(className);
	  }
  });
	chrome.storage.local.get(["renowifyData"], function(result){
		console.log(result);
		if(result.renowifyData != undefined){
			let renowifyDataObject = result.renowifyData
			renowifyDataObject["renowify_btn"] = false;
			chrome.storage.local.set({renowifyData:renowifyDataObject});
		}
	});
}


// ===== Tools

// Fonction pour activer un style au clic sur le switch correspondant
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const currentTabId = tabs[0].id
	const checkboxes = document.querySelectorAll('input[id^=checkbox_]')
	for(let i=0; i<checkboxes.length; i++)
	checkboxes[i].addEventListener('click', (event) => {
		let checked = event.target.checked	
		let checkboxId = (event.target.id).replace("checkbox_", "");
		activeToolSwitch(checkboxId, checked, currentTabId);
		chrome.storage.local.get(["renowifyData"], function(result){
			console.log(result);
			if(result.renowifyData != undefined){
				let renowifyDataObject = result.renowifyData
				renowifyDataObject[checkboxId] = checked;
				chrome.storage.local.set({renowifyData:renowifyDataObject});
			}
		});		
	});
}); 

// Fonction pour recuperer l'état actif des switch à l'ouverture de la popup
function retrieveSwitchState(rd,currentTabId){
	const SwitchList = ["alt","focus","theme","lang","space","headings","tabindex","autocomplete","table","link"]
	SwitchList.forEach(el => {
		if(rd[el] != undefined && rd[el]){
		console.log(">> "+el+ " : "+ rd[el])
			document.getElementById('checkbox_'+el).checked = true;
			activeToolSwitch(el, true, currentTabId)
		}	
	});
}

// Fonction pour injecter les CSS ou les retirer
function activeToolSwitch(checkboxId, checked, currentTabId){
	const target = document.getElementById('checkbox_'+checkboxId);
	target.setAttribute('aria-pressed', target.getAttribute("aria-pressed") === 'true' ? 'false' : 'true');
	console.log("ActiveToolSwitch > "+checkboxId+" : "+checked)
	if (checked) {
		chrome.scripting.insertCSS({
			files: [styleFolder+"nia_"+checkboxId+".css"],
			target: {tabId: currentTabId}
		});
		addBadge(currentTabId);
	} else {
		chrome.scripting.removeCSS({
			files: [styleFolder+"nia_"+checkboxId+".css"],
			target: {tabId: currentTabId}
		});
		removeBadge(currentTabId);
	}	
}

// Fonction pour re-injecter les CSS suite au reload de la page
chrome.tabs.onUpdated.addListener(function(currentTabId, changeInfo, tab) {
  if(changeInfo.status == 'complete'){
    chrome.storage.local.get(["renowifyData"], function(result){
	  console.log("Refresh de la page")
	  console.log(result);
	  if(result.renowifyData != undefined){
		if(result.renowifyData["renowify_btn"] != undefined){
		  const renowify_btn = document.getElementById('renowify_btn');
		  if(document.body.classList.contains("panel-injected")){	  	  
			  if(result.renowifyData["renowify_btn"]){
				renowify_btn.setAttribute('checked', true);
				renowify_btn.setAttribute('aria-pressed', true);
			  }
			  else{
				renowify_btn.removeAttribute('checked')
				renowify_btn.setAttribute('aria-pressed', false);
			  }
		  }
		  else{
			  let renowifyDataObject = result.renowifyData
			  renowifyDataObject["renowify_btn"] = false;
			  chrome.storage.local.set({renowifyData:renowifyDataObject});
		  }
		}
		if(result.renowifyData["renowify_type"] != undefined){
		  const renowify_selected = document.getElementById('radio_'+result.renowifyData["renowify_type"]);
		  renowify_selected.setAttribute('checked', true);
		}
		retrieveSwitchState(result.renowifyData, currentTabId);
	  }
	})
   }
}); 


// ==== Gestion du Badge 

function addBadge(currentTabId){
	chrome.action.setBadgeText({
		tabId: currentTabId,
		text: 'ON'
	});
}

function removeBadge(currentTabId) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][role="switch"]');
  let isActif = false;
  for (var i = 0; i < checkboxes.length; i++) {
	  if (checkboxes[i].checked){
		isActif = true;  
		break;
	  }
  }
  if(isActif == false){
    chrome.action.setBadgeText({
	  tabId: currentTabId,
	  text: 'OFF'
	});
  }
}
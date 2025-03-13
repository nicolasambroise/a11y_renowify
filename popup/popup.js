/* Script Check A11Y Renowify - Nicolas AMBROISE */

// ===== Globals
// Stockage
chrome.storage.local.get(["renowifyData"], function(result){
  console.log(result);
  if(result.renowifyData != undefined){
	if(result.renowifyData["renowify_btn"] != undefined){
      const renowify_btn = document.getElementById('renowify_btn');
	  if(result.renowifyData["renowify_btn"]){
	    renowify_btn.setAttribute('checked', true);
	    renowify_btn.setAttribute('aria-pressed', true);
	  }
	  else{
	    renowify_btn.removeAttribute('checked')
	    renowify_btn.setAttribute('aria-pressed', false);
	  }
	}
	if(result.renowifyData["renowify_type"] != undefined){
      const renowify_selected = document.getElementById('radio_'+result.renowifyData["renowify_type"]);
	  renowify_selected.setAttribute('checked', true);
	}
	if(result.renowifyData["alt"] != undefined){
      document.getElementById('checkbox_alt').setAttribute('checked', result.renowifyData["alt"]);
	}
	if(result.renowifyData["focus"] != undefined){
      document.getElementById('checkbox_focus').setAttribute('checked', result.renowifyData["focus"]);
	}
	if(result.renowifyData["theme"] != undefined){
      document.getElementById('checkbox_theme').setAttribute('checked', result.renowifyData["theme"]);
	}
	if(result.renowifyData["lang"] != undefined){
      document.getElementById('checkbox_lang').setAttribute('checked', result.renowifyData["lang"]);
	}
	if(result.renowifyData["space"] != undefined){
      document.getElementById('checkbox_space').setAttribute('checked', result.renowifyData["space"]);
	}
	if(result.renowifyData["headings"] != undefined){
      document.getElementById('checkbox_headings').setAttribute('checked', result.renowifyData["headings"]);
	}
	if(result.renowifyData["tabindex"] != undefined){
      document.getElementById('checkbox_tabindex').setAttribute('checked', result.renowifyData["tabindex"]);
	}
	if(result.renowifyData["autocomplete"] != undefined){
      document.getElementById('checkbox_autocomplete').setAttribute('checked', result.renowifyData["autocomplete"]);
	}
	if(result.renowifyData["table"] != undefined){
      document.getElementById('checkbox_table').setAttribute('checked', result.renowifyData["table"]);
	}
	if(result.renowifyData["link"] != undefined){
      document.getElementById('checkbox_link').setAttribute('checked', result.renowifyData["link"]);
	}
  }
})	  

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
				files: [scriptFolder+'/parts/nia01_config.js',scriptFolder+'/parts/nia02_images.js',scriptFolder+'/parts/nia03_links.js',scriptFolder+'/parts/nia04_form.js',scriptFolder+'/parts/nia05_obligatoire.js',scriptFolder+'/parts/nia06_structure.js',scriptFolder+'/parts/nia07_title.js',scriptFolder+'/parts/nia08_table.js',scriptFolder+'/parts/nia09_nav.js',scriptFolder+'/parts/nia10_oldtag.js',scriptFolder+'/parts/nia11_lang.js',scriptFolder+'/parts/nia12_button.js',scriptFolder+'/parts/nia13_lottie.js',scriptFolder+'/parts/nia14_colors.js',scriptFolder+'/parts/nia15_secu.js',scriptFolder+'/parts/nia_functions.js',scriptFolder+'/parts/nia_resultpanel.js',scriptFolder+'/parts/nia_savebdd.js',scriptFolder+'/parts/nia_savedecla.js',scriptFolder+'/parts/nia_thirdservices.js',scriptFolder+'/renowify.js'],
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
			const p4 = chrome.action.setBadgeText({
				tabId: currentTabId,
				text: 'ON'
			});	
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
function removeBadge(currentTabId) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"][role="switch"]');
  const isActif = false;
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

// ===== Tools
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const currentTabId = tabs[0].id
	const checkboxes = document.querySelectorAll('input[id^=checkbox_]')
	for(let i=0; i<checkboxes.length; i++)
	checkboxes[i].addEventListener('click', (event) => {
		let checked = event.target.checked	
		let checkbox_id = (event.target.id).replace("checkbox_", "");
		event.target.setAttribute('aria-pressed', event.target.getAttribute("aria-pressed") === 'true' ? 'false' : 'true');
		console.log(checkbox_id+" : "+checked)
		toggleCSS("nia_"+checkbox_id, checked, currentTabId);
		
		chrome.storage.local.get(["renowifyData"], function(result){
			console.log(result);
			if(result.renowifyData != undefined){
				let renowifyDataObject = result.renowifyData
				renowifyDataObject[checkbox_id] = checked;
				chrome.storage.local.set({renowifyData:renowifyDataObject});
			}
		});	
	});
}); 

function toggleCSS(filename, checked, currentTabId) {
	if (checked) {
		chrome.scripting.insertCSS({
			files: [styleFolder+`${filename}.css`],
			target: {tabId: currentTabId}
		});
	} else {
		chrome.scripting.removeCSS({
			files: [styleFolder+`${filename}.css`],
			target: {tabId: currentTabId}
		});
	}
}

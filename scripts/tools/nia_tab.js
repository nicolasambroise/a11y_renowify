// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if(typeof nia_tabElm !== 'undefined'){
	nia_tabError = 0;
	
	nia_tabElm.forEach((item, index) => {
		color = "green";	
		if(item.hasAttribute("tabindex") && item.getAttribute("tabindex") > 0) {
			color = "red";
			nia_tabError++;
		}
		let label = index+1; 
		const spanLabel = document.createElement('span');
		spanLabel.classList.add("checkA11YSpan");
		spanLabel.classList.add("checkA11YSpan__"+color);
		spanLabel.innerHTML = label;
		item.before(spanLabel);
	});



	// RESULT
	nia_tabBottomLine = document.createElement('p');
	nia_tabBottomLine.id = "checkA11YBottomLine";
	nia_tabBottomLine.innerHTML = "Tab : "+nia_tabElm.length+" élément(s) dont "+nia_tabError+ " erreur(s)<br><span id='checkA11YResultTab'>No focus</span>";
	document.body.appendChild(nia_tabBottomLine)

	document.addEventListener('focusin', function(){
		let activeElm = document.activeElement;
		let activeElmAttrs = activeElm.attributes;
		let attrsList = '';
		console.log(activeElm)

		Array.from(activeElmAttrs).forEach(({ name, value }) => {
			attrsList += ` ${name}="${value}"`;
		})

		document.getElementById("checkA11YResultTab").innerHTML = "Current focus : &lt;"+activeElm.tagName.toLowerCase()+" "+attrsList+"&gt;";
		}, true);
}
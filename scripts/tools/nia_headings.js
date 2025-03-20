// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if(typeof nia_headElm !== 'undefined'){
	nia_headRole = 0;
	nia_headHn = 0;
		
	nia_headElm.forEach(item => {
		let label;
		color = "green";
		
		if(item.hasAttribute("role") && item.getAttribute("role") == "heading"){
			color = "blue";
			nia_headRole++;
			label = '&lt;'+item.tagName.toLowerCase()+' role="heading"';
			if(item.hasAttribute("aria-level")){
			  label +=' aria-level="'+item.getAttribute("aria-level")+'"'
			}
			label += "&gt;";
		}
		else{
			nia_headHn++;
			label = '&lt;'+item.tagName.toLowerCase()+'&gt;';
		}
		item.classList.add("checkA11YOutline__"+color);
		const spanLabel = document.createElement('span');
		spanLabel.classList.add("checkA11YSpan");
		spanLabel.classList.add("checkA11YSpan__"+color);
		spanLabel.innerHTML = label;
		item.before(spanLabel);
	});

	// RESULT
	nia_headBottomLine = document.createElement('p');
	nia_headBottomLine.id = "checkA11YBottomLine";
	nia_headBottomLine.innerHTML = 'Title : [Hn : '+nia_headHn+'] [role="heading" : '+nia_headRole+']';
	document.body.appendChild(nia_headBottomLine)
}
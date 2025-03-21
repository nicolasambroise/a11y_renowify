// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if(typeof nia_linkElm !== 'undefined'){
	nia_linkWarning = 0;
	
	nia_linkElm.forEach(item => {
		color = "green";
		
		let title = "";
		let content = item.innerText.replaceAll(/\n|\r/g, ' ').replaceAll(/\s+/g, ' ').trim();
		
		if(item.hasAttribute("title") && item.getAttribute("title").replaceAll(/[.:;,?!{}$()|'"-\/]/g, ' ').includes(content.replaceAll(/[.:;,?!{}$()|'"-\/]/g, ' '))){
			label = "<strong>Label</strong> : "+content+"<br><strong>Title</strong> : "+item.getAttribute("title");
		}
		else if(item.hasAttribute("title") && !item.getAttribute("title").replaceAll(/[.:;,?!{}$()|'"-\/]/g, ' ').includes(content.replaceAll(/[.:;,?!{}$()|'"-\/]/g, ' '))){
		    color = "orange";
			nia_linkWarning++;
			label = "<strong>Label</strong> : "+content+"<br><strong>Title</strong> : "+item.getAttribute("title");
			console.log(content+ " VS")
			console.log(item.getAttribute("title"))
			
		}
		else if(content == "") {
			color = "orange";
			nia_linkWarning++;
			label = '<strong>Label</strong> : "'+content+'"';
			console.log(item)
		}
		else{
			label = "<strong>Label</strong> : "+content;
		}

		item.classList.add("checkA11YOutline__"+color);
		const spanLabel = document.createElement('span');
		spanLabel.classList.add("checkA11YSpan");
		spanLabel.classList.add("checkA11YSpan__"+color);
		spanLabel.innerHTML = label;
		item.before(spanLabel);
	});

	// RESULT
	nia_linkBottomLine = document.createElement('p');
	nia_linkBottomLine.id = "checkA11YBottomLine";
	nia_linkBottomLine.innerHTML = "Labels à vérifier : "+nia_linkWarning;
	document.body.appendChild(nia_linkBottomLine)
}


const imgElm = document.querySelectorAll('img,[role="img"]:not(svg)');
const imgSvg = document.querySelectorAll('svg,svg[role="img"]');
const imgObject = document.querySelectorAll('embed[type="image"],canvas,map,area,object[type="image"]');

let error = 0;
let warning = 0;
let label;

imgElm.forEach(item => {
	color = "green";
	if(item.hasAttribute(Alt)) { 
		label = "Alt="+item.hasAttribute(Alt);
		if(item.hasAttribute(Alt) == ""){color = "blue";}
	}
	else {color = "red"; label = "Attribut Alt manquant !";}
	item.classList.add("checkA11YOutline__"+color);
	const spanLabel = document.createElement('span');
	spanLabel.classList.add("checkA11YSpan");
	spanLabel.classList.add("checkA11YSpan__"+color);
	spanLabel.innerHTML = label;
}

/*
* {
    box-sizing: border-box;
}

html {
  counter-reset: imgElm imgSvg imgObject imgWarning imgError;
}

html::after {
  content: "Textes alt. d'images\A - " counter(imgElm) " img\A"
			"- " counter(imgSvg) " svg\A"
			"- " counter(imgobject) " object\A\A\A"
            ">> " counter(imgWarning) " warning(s)\A"
			">> " counter(imgError) " error(s)\A"
      ;
  position: fixed !important;
  top: 400px !important;
  right: 0 !important;
  z-index: 123456 !important;
  width: 12em !important;
  border: 5px solid #fff;
  border-right: 0;
  padding: 15px !important;
  white-space: pre !important;
  font-family: sans-serif !important;
  font-size: 18px !important;
  font-weight: bold;
  color: #fff !important;
  background: #005166 !important;
}

[role="img"],
img,
svg,
area,
object[type="image"],
canvas,
embed[type="image"] {
    max-width: 150px;
    height: auto;
    margin-bottom:30px;
    outline: solid 3px green;
}


img:not([alt]){
    outline: solid 5px red!important;   
    counter-increment: imgError;
}


svg:not([aria-hidden="true"]) {
    outline: solid 5px red!important;   
    counter-increment: imgError;
}

svg:not([focusable="false"]) {
    outline: solid 5px orange;   
    counter-increment: imgWarning;
}

.cmp-focus img:not([alt=""]){
    outline: solid 5px red!important;   
    counter-increment: imgError;
}

figcaption,
.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title {
    outline: solid 5px orange;   
    counter-increment: imgWarning;
}


img,[role="img"]:not(svg) {counter-increment: imgElm;}
svg,svg[role="img"]{counter-increment: imgSvg;}
embed,canvas,map,area,object{counter-increment: imgObject;}
*/

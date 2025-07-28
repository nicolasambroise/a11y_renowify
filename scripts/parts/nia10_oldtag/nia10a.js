/* A. Old tag

*** Liste W3C ***
<acronym>	Defines an acronym
<applet>	Defines an applet
<basefont>	Defines an base font for the page.
<big>	Defines big text
<center>	Defines centered text
<dir>	Defines a directory list
<font>	Defines text font, size, and color
<frame>	Defines a frame
<frameset>	Defines a set of frames
<isindex>	Defines a single-line input field
<noframes>	Defines a noframe section
<s>	Defines strikethrough text
<strike>	Defines strikethrough text
<tt>	Defines teletype text
<u> 	Defines underlined text

*** Add du RAWeb 10.1.1 ***
<blink>
<marquee>

** Note : Attention au plugin Google Translate : Il ajoute automatiquement des balises <font> autour des textes traduits.
*/
function check_test_10a() {
  const nia10a_nodes = document.querySelectorAll(
    'acronym,applet,basefont,big,center,dir,font,frame,frameset,isindex,noframes,s,strike,tt,u,blink,marquee'
  ); // NC
  if (nia10a_nodes && nia10a_nodes.length > 0 && isItemsVisible(nia10a_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia10a' class='result-focus label-red'>10-A</a> : Présence de balise HTML obsolètes ou servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-1' target='_blank'>RAWeb 10.1.1</a>]</li>"
    );
    setItemsOutline(nia10a_nodes, 'red', 'nia10a', '10-A');
  }
}

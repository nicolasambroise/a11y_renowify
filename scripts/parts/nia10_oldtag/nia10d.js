// D. Presentation attribut
function check_test_10d() {
  const nia10d_nodes = document.querySelectorAll(
    '[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [color], [compact], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size]:not(select), *:not(symbol) > *:not(g) > [width]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect),*:not(symbol) > *:not(g) > [height]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect)'
  );
  if (nia10d_nodes && nia10d_nodes.length > 0 && isItemsVisible(nia10d_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia10d' class='result-focus label-red'>10-D</a> : Présence d'attributs HTML servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-2' target='_blank'>RAWeb 10.1.2</a>]</li>"
    );
    setItemsOutline(nia10d_nodes, 'red', 'nia10d', '10-D');
  }
}
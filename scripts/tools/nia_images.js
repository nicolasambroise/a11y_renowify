// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if (typeof nia_images !== 'undefined') {
  nia_imgError = 0;
  nia_imgWarning = 0;
  nia_imgElm = 0;
  nia_imgSvg = 0;
  nia_imgObject = 0;

  nia_images.forEach((item) => {
    let label;
    color = 'green';

    if (
      item.tagName == 'IMG' ||
      (item.hasAttribute('role') && item.getAttribute('role') == 'img')
    ) {
      nia_imgElm++;
      if (item.hasAttribute('alt')) {
        label = 'Alt="' + item.getAttribute('alt') + '"';
        if (item.getAttribute('alt') != '') {
          if (item.closest('.cmp-focus') != null) {
            color = 'red';
            label = 'Alt défini dans un composant focus !';
            nia_imgError++;
          } else {
            color = 'blue';
          }
        } else if (item.closest('figure') != null) {
          color = 'yellow';
          label = 'Alt="" dans <figure>';
          nia_imgWarning++;
        }
      } else {
        color = 'red';
        label = 'Attribut Alt manquant !';
        nia_imgError++;
      }
    } else if (item.tagName == 'SVG' || item.tagName == 'svg') {
      label = 'SVG';
      nia_imgSvg++;
      if (
        !item.hasAttribute('aria-hidden') ||
        item.getAttribute('aria-hidden') != 'true'
      ) {
        color = 'red';
        label = 'SVG - Attribut aria-hidden="true" manquant';
        nia_imgError++;
      } else if (
        !item.hasAttribute('focusable') ||
        item.getAttribute('focusable') != 'false'
      ) {
        color = 'yellow';
        label = 'SVG - Attribut focusable="false" manquant';
        nia_imgWarning++;
      }
    } else {
      label = item.tagName;
      nia_imgObject++;
    }

    item.classList.add('checkA11YOutline__' + color);
    const spanLabel = document.createElement('span');
    spanLabel.classList.add('checkA11YSpan');
    spanLabel.classList.add('checkA11YSpan__' + color);
    spanLabel.textContent = label;
    item.before(spanLabel);
  });

  // RESULT
  nia_imgBottomLine = document.createElement('p');
  nia_imgBottomLine.id = 'checkA11YBottomLine';
  nia_imgBottomLine.innerHTML =
    'Images : ' +
    nia_imgElm +
    ' img - ' +
    nia_imgSvg +
    ' svg - ' +
    nia_imgObject +
    ' object <br>' +
    nia_imgWarning +
    ' warning(s) - ' +
    nia_imgError +
    ' error(s)';
  document.body.appendChild(nia_imgBottomLine);
}

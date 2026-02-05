// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if (typeof nia_tableElm !== 'undefined') {
  nia_tableError = 0;
  nia_tableWarning = 0;

  nia_tableElm.forEach((item) => {
    color = 'green';
    let attr = '';

    if (item.tagName == 'TH') {
      if (!item.hasAttribute('scope') && item.hasAttribute('id')) {
        color = 'yellow';
        attr = ' ⛔scope';
        nia_tableWarning++;
      } else if (!item.hasAttribute('scope') && !item.hasAttribute('id')) {
        color = 'red';
        attr = ' ⛔scope';
        nia_tableError++;
      } else {
        attr = ' scope=' + item.getAttribute('scope');
      }
      if (item.hasAttribute('id')) {
        attr += ' id=' + item.getAttribute('id');
      }
      if (item.hasAttribute('headers')) {
        attr += ' headers=' + item.getAttribute('headers');
      }
    } else if (item.tagName == 'TD') {
      if (item.hasAttribute('headers')) {
        attr += ' headers=' + item.getAttribute('headers');
      }
    }

    label = '<' + item.tagName.toLowerCase() + attr + '>';
    item.classList.add('checkA11YOutline__' + color);
    const spanLabel = document.createElement('span');
    spanLabel.classList.add('checkA11YSpan');
    spanLabel.classList.add('checkA11YSpan__' + color);
    spanLabel.textContent = label;
    item.before(spanLabel);
  });

  // RESULT
  nia_linkBottomLine = document.createElement('p');
  nia_linkBottomLine.id = 'checkA11YBottomLine';
  nia_linkBottomLine.textContent =
    'Attributs de tableau : ' +
    nia_linkError +
    ' erreur(s) et ' +
    nia_tableWarning +
    ' alerte(s)';
  document.body.appendChild(nia_linkBottomLine);
}

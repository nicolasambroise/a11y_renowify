// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if (typeof nia_langElm !== 'undefined') {
  nia_langFr = 0;
  nia_langEn = 0;
  nia_langDe = 0;
  nia_langLb = 0;
  nia_langOther = 0;

  nia_langElm.forEach((item) => {
    let label;
    color = 'green';

    if (item.hasAttribute('lang')) {
      label = item.getAttribute('lang').toUpperCase();
      if (label == 'FR') {
        nia_langFr++;
      } else if (label == 'DE') {
        nia_langDe++;
      } else if (label == 'EN') {
        nia_langEn++;
      } else if (label == 'LB') {
        nia_langLb++;
      } else {
        color = 'yellow';
        nia_langOther++;
      }
      label = '⚑ : ' + label;
    }

    item.classList.add('checkA11YOutline__' + color);
    const spanLabel = document.createElement('span');
    spanLabel.classList.add('checkA11YSpan');
    spanLabel.classList.add('checkA11YSpan__' + color);
    spanLabel.textContent = label;
    item.before(spanLabel);
  });

  // RESULT
  nia_langBottomLine = document.createElement('p');
  nia_langBottomLine.id = 'checkA11YBottomLine';
  nia_langBottomLine.textContent =
    'Langue : [FR : ' +
    nia_langFr +
    '] [EN : ' +
    nia_langEn +
    '] [DE : ' +
    nia_langDe +
    '] [LB : ' +
    nia_langLb +
    '] [Other : ' +
    nia_langOther +
    ']';
  document.body.appendChild(nia_langBottomLine);
}

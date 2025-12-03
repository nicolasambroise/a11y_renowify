// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if (typeof nia_tabElm !== 'undefined') {
  nia_tabError = 0;

  // Enable Style
  document.body.classList.add('tab-style-injected');

  nia_tabElm.forEach((item, index) => {
    color = 'green';
    if (item.hasAttribute('tabindex') && item.getAttribute('tabindex') > 0) {
      color = 'red';
      nia_tabError++;
    }
    let label = index + 1;
    const spanLabel = document.createElement('span');
    spanLabel.classList.add('checkA11YSpan');
    spanLabel.classList.add('checkA11YSpan__' + color);
    spanLabel.textContent = label;
    if (item.tagName == 'SUMMARY') {
      item.parentElement.before(spanLabel);
    } else {
      item.before(spanLabel);
    }
  });

  // RESULT
  nia_tabBottomLine = document.createElement('p');
  nia_tabBottomLine.id = 'checkA11YBottomLine';
  nia_tabBottomLine.innerHTML =
    'Tab : ' +
    nia_tabElm.length +
    ' élément(s) dont ' +
    nia_tabError +
    " erreur(s)<br><span id='checkA11YResultTab'>No focus</span>";
  document.body.appendChild(nia_tabBottomLine);

  //document.addEventListener('focusin', updateCheckA11YResultTab(), true);
  document.addEventListener(
    'focusin',
    function () {
      const resultLine = document.getElementById('checkA11YResultTab');
      if (resultLine) {
        let activeElm = document.activeElement;
        let activeElmAttrs = activeElm.attributes;
        let attrsList = '';
        console.log(activeElm);

        Array.from(activeElmAttrs).forEach(({ name, value }) => {
          attrsList += ` ${name}="${value}"`;
        });

        resultLine.textContent =
          'Current focus : <' +
          activeElm.tagName.toLowerCase() +
          ' ' +
          attrsList +
          '>';
      }
    },
    true
  );
}

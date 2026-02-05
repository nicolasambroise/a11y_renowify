// Enable Style
document.body.classList.add('hidden-style-injected');

if (typeof nia_hiddenElm !== 'undefined' && typeof nia_allElm !== 'undefined') {
  // Rendre visible les contenus en .at
  const nia_atElm = [...nia_allElm].filter((item) => isItemSROnly(item));
  nia_atElm.forEach((item) => {
    color = 'blue';
    const label = '<' + item.tagName.toLowerCase() + '>' + item.innerText;
    item.classList.add('checkA11YOutline__' + color);
    const spanLabel = document.createElement('span');
    spanLabel.classList.add('checkA11YSpan');
    spanLabel.classList.add('checkA11YSpan__' + color);
    spanLabel.textContent = label;
    item.before(spanLabel);
  });

  // Encadrer les contenus en [aria-hidden]
  nia_hiddenElm.forEach((item) => {
    color = 'yellow';
    const label = '<' + item.tagName.toLowerCase() + '> hidden';
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
    "Nombre d'élements masqués aux outils d'accessibilité : " +
    nia_hiddenElm.length +
    ' et visibles seulement par eux : ' +
    nia_atElm.length;
  document.body.appendChild(nia_linkBottomLine);
}

function isItemSROnly(item) {
  let isSROnly = false;
  if (
    item.checkVisibility({ opacityProperty: true, visibilityProperty: true })
  ) {
    while (item.parentElement && item.nodeName !== 'HTML' && !isSROnly) {
      const style = window.getComputedStyle(item);
      if (
        style.clip === 'rect(1px, 1px, 1px, 1px)' &&
        style.overflow === 'hidden'
      ) {
        isSROnly = true; // Assigne true à isSROnly
      }
      item = item.parentElement;
    }
  }
  return isSROnly;
}

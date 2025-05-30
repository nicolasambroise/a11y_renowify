// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if (typeof nia_formFields !== 'undefined') {
  nia_formWarning = 0;
  nia_formElm = 0;

  nia_formFields.forEach((item) => {
    label = '';
    color = 'green';

    if (item.hasAttribute('autocomplete')) {
      nia_formElm++;
      label = 'autocomplete="' + item.getAttribute('autocomplete') + '"';
    }

    if (
      item.tagName == 'INPUT' &&
      (item.getAttribute('name').toLowerCase() == 'lastname' ||
        item.getAttribute('name').toLowerCase() == 'name') &&
      (!item.hasAttribute('autocomplete') ||
        item.getAttribute('autocomplete') != 'family-name')
    ) {
      color = 'orange';
      label =
        'autocomplete="' +
        item.getAttribute('autocomplete') +
        '" --> family-name ?';
      nia_formWarning++;
    } else if (
      item.tagName == 'INPUT' &&
      item.getAttribute('name').toLowerCase() == 'firstname' &&
      (!item.hasAttribute('autocomplete') ||
        item.getAttribute('autocomplete') != 'given-name')
    ) {
      color = 'orange';
      label =
        'autocomplete="' +
        item.getAttribute('autocomplete') +
        '" --> given-name ?';
      nia_formWarning++;
    } else if (
      item.tagName == 'INPUT' &&
      (item.getAttribute('name') == 'email' ||
        item.getAttribute('type') == 'email') &&
      (!item.hasAttribute('autocomplete') ||
        item.getAttribute('autocomplete') != 'email')
    ) {
      color = 'orange';
      label =
        'autocomplete="' + item.getAttribute('autocomplete') + '" --> email ?';
      nia_formWarning++;
    } else if (
      item.tagName == 'INPUT' &&
      (item.getAttribute('name') == 'tel' ||
        item.getAttribute('name') == 'phone' ||
        item.getAttribute('name') == 'telephone' ||
        item.getAttribute('type') == 'tel') &&
      (!item.hasAttribute('autocomplete') ||
        item.getAttribute('autocomplete') != 'tel')
    ) {
      color = 'orange';
      label =
        'autocomplete="' + item.getAttribute('autocomplete') + '" --> tel ?';
      nia_formWarning++;
    } else if (
      item.getAttribute('name') == 'country' &&
      item.tagName == 'SELECT' &&
      (!item.hasAttribute('autocomplete') ||
        item.getAttribute('autocomplete') != 'country')
    ) {
      color = 'orange';
      label =
        'autocomplete="' +
        item.getAttribute('autocomplete') +
        '" --> country ?';
      nia_formWarning++;
    } else if (
      item.getAttribute('name') == 'country' &&
      item.tagName == 'INPUT' &&
      (!item.hasAttribute('autocomplete') ||
        item.getAttribute('autocomplete') != 'country-name')
    ) {
      color = 'orange';
      label =
        'autocomplete="' +
        item.getAttribute('autocomplete') +
        '" --> country-name ?';
      nia_formWarning++;
    }

    if (label != '') {
      item.classList.add('checkA11YOutline__' + color);
      const spanLabel = document.createElement('span');
      spanLabel.classList.add('checkA11YSpan');
      spanLabel.classList.add('checkA11YSpan__' + color);
      spanLabel.textContent = label;
      item.before(spanLabel);
    }
  });

  // RESULT
  nia_formBottomLine = document.createElement('p');
  nia_formBottomLine.id = 'checkA11YBottomLine';
  nia_formBottomLine.textContent =
    'Forms : ' +
    nia_formElm +
    ' élément(s) avec attribut autocomplet - ' +
    nia_formWarning +
    ' alertes(s)';
  document.body.appendChild(nia_formBottomLine);
}

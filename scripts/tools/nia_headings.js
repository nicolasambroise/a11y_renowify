// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if (typeof nia_headElm !== 'undefined') {
  nia_headRole = 0;
  nia_headHn = 0;
  nia_headMsg = "<ul id='checkA11YHeadMsg'>";
  nia_headBtn =
    "<button id='checkA11YHeadBtn' title='Liste des en-têtes' aria-expanded='true' type='button'>Liste des en-têtes</button>";

  nia_headElm.forEach((item) => {
    let label;
    let suffix = '';
    let color = 'green';
    let item_title = item.innerText.replace(/\s/g, ' ').trim();

    if (
      item_title == '' &&
      item.querySelector('img') &&
      item.querySelector('img').hasAttribute('alt') &&
      item.querySelector('img').getAttribute('alt') != ''
    ) {
      item_title = item.querySelector('img').getAttribute('alt');
    } else if (isItemVisible(item) && item_title == '') {
      suffix = " <strong style='color:red'>[EMPTY]</strong>";
      color = 'red';
    } else if (!isItemVisible(item) && !isItemSROnly(item)) {
      suffix = ' <strong>[HIDDEN]</strong>';
    } else if (isItemSROnly(item)) {
      suffix = ' <strong>[SROnly]</strong>';
    }

    //item_title = item.innerText+

    if (item.hasAttribute('role') && item.getAttribute('role') == 'heading') {
      if (color != 'red') color = 'blue';
      nia_headRole++;
      label = '<' + item.tagName.toLowerCase() + ' role="heading"';
      if (item.hasAttribute('aria-level')) {
        label += ' aria-level="' + item.getAttribute('aria-level') + '"';

        if (item.getAttribute('aria-level') == '1') {
          nia_headMsg += '<li>1 - ' + item_title + suffix + '</li>';
        } else if (item.getAttribute('aria-level') == '2') {
          nia_headMsg += '<li>..2 - ' + item_title + suffix + '</li>';
        } else if (item.getAttribute('aria-level') == '3') {
          nia_headMsg += '<li>....3 - ' + item_title + suffix + '</li>';
        } else if (item.getAttribute('aria-level') == '4') {
          nia_headMsg += '<li>......4 - ' + item_title + suffix + '</li>';
        } else if (item.getAttribute('aria-level') == '5') {
          nia_headMsg += '<li>........5 - ' + item_title + suffix + '</li>';
        } else if (item.getAttribute('aria-level') == '6') {
          nia_headMsg += '<li>..........6 - ' + item_title + suffix + '</li>';
        } else {
          nia_headMsg += '<li>error</li>';
        }
      } else {
        nia_headMsg += '<li>..2 - ' + item.innerText + suffix + '</li>';
      }
      label += '>';
    } else {
      nia_headHn++;
      label = '<' + item.tagName.toLowerCase() + '>';
      if (item.tagName.toLowerCase() == 'h1') {
        nia_headMsg += '<li>1 - ' + item_title + suffix + '</li>';
      } else if (item.tagName.toLowerCase() == 'h2') {
        nia_headMsg += '<li>..2 - ' + item_title + suffix + '</li>';
      } else if (item.tagName.toLowerCase() == 'h3') {
        nia_headMsg += '<li>....3 - ' + item_title + suffix + '</li>';
      } else if (item.tagName.toLowerCase() == 'h4') {
        nia_headMsg += '<li>......4 - ' + item_title + suffix + '</li>';
      } else if (item.tagName.toLowerCase() == 'h5') {
        nia_headMsg += '<li>........5 - ' + item_title + suffix + '</li>';
      } else if (item.tagName.toLowerCase() == 'h6') {
        nia_headMsg += '<li>..........6 - ' + item_title + suffix + '</li>';
      } else {
        nia_headMsg += '<li>error</li>';
      }
    }
    item.classList.add('checkA11YOutline__' + color);
    const spanLabel = document.createElement('span');
    spanLabel.classList.add('checkA11YSpan');
    spanLabel.classList.add('checkA11YSpan__' + color);
    spanLabel.textContent = label;
    item.before(spanLabel);
  });

  // RESULT
  nia_headBottomLine = document.createElement('p');
  nia_headBottomLine.id = 'checkA11YBottomLine';
  nia_headBottomLine.innerHTML =
    'Title : [Hn : ' +
    nia_headHn +
    '] [role="heading" : ' +
    nia_headRole +
    ']<br>' +
    nia_headBtn +
    nia_headMsg +
    '</ul>';
  document.body.appendChild(nia_headBottomLine);
  toggleHeadList();
  document
    .getElementById('checkA11YHeadBtn')
    .addEventListener('click', toggleHeadList);

  function toggleHeadList() {
    const headMsg = document.getElementById('checkA11YHeadMsg');
    headMsg.style.display = headMsg.style.display === 'none' ? '' : 'none';
    const headBtn = document.getElementById('checkA11YHeadBtn');
    headBtn.setAttribute(
      'aria-expanded',
      headBtn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
    );
  }
}

// decoratif : green
// informatif : bleu
// Bonne pratique : jaune
// Warning : orange
// Error : rouge

if (typeof nia_linkElm !== 'undefined') {
  nia_linkError = 0;

  nia_linkElm.forEach((item) => {
    color = 'green';

    if (isItemVisible(item)) {
      let label;
      let title = '';
      let content = item.innerText
        .replaceAll(/\n|\r/g, ' ')
        .replaceAll(/\s+/g, ' ')
        .trim();
      let lang = item.closest('[lang]').getAttribute('lang');

      let title_san = '';
      if (item.hasAttribute('title')) {
        title = item.getAttribute('title');
        title_san = sanitizeText(title, lang);
      }
      let content_san = sanitizeText(content, lang);

      if (content == '') {
        let images_inside = item.querySelectorAll(
          'img[alt]:not([alt=""]):not([aria-hidden="true"]):not([hidden])'
        );

        if (images_inside.length == 1) {
          let img_title = images_inside[0].getAttribute('alt');
          let img_title_san = sanitizeText(img_title, lang);
          if (item.hasAttribute('title') && title_san.includes(img_title_san)) {
            label =
              '&lt;' +
              item.tagName.toLowerCase() +
              '&gt;<br><span class="checkA11YSpan-desc"><strong>Label</strong> : ' +
              img_title_san +
              ' <br><strong>Title</strong> : ' +
              title +
              '</span>';
          } else if (item.hasAttribute('title')) {
            color = 'red';
            nia_linkError++;
            label =
              '1. &lt;' +
              item.tagName.toLowerCase() +
              '&gt;<br><span class="checkA11YSpan-desc"><strong>Label</strong> : ' +
              img_title_san +
              ' <br><strong>Title</strong> : ' +
              title +
              '</span>';
          } else {
            label =
              '&lt;' +
              item.tagName.toLowerCase() +
              '&gt;<br><span class="checkA11YSpan-desc"><strong>Label</strong> : ' +
              img_title_san;
          }
        } else if (item.hasAttribute('title')) {
          color = 'red';
          nia_linkError++;
          label =
            '&lt;' +
            item.tagName.toLowerCase() +
            '&gt;<br><span class="checkA11YSpan-desc"><strong>Label</strong> : "" <br><strong>Title</strong> : ' +
            title +
            '</span>';
        } else {
          color = 'red';
          nia_linkError++;
          label =
            '&lt;' +
            item.tagName.toLowerCase() +
            '&gt;<br><span class="checkA11YSpan-desc"><strong>Label</strong> : ""</span>';
        }
      } else if (
        item.hasAttribute('title') &&
        title_san.includes(content_san)
      ) {
        label =
          '&lt;' +
          item.tagName.toLowerCase() +
          '&gt;<br><span class="checkA11YSpan-desc"><strong>Label</strong> : ' +
          content +
          ' <br><strong>Title</strong> : ' +
          title +
          '</span>';
      } else if (item.hasAttribute('title')) {
        color = 'red';
        nia_linkError++;
        label =
          '&lt;' +
          item.tagName.toLowerCase() +
          '&gt;<br><span class="checkA11YSpan-desc"><strong>Label</strong> : ' +
          content +
          ' <br><strong>Title</strong> : ' +
          title +
          '</span>';
      } else {
        label =
          '&lt;' +
          item.tagName.toLowerCase() +
          '&gt;<br><span class="checkA11YSpan-desc"><strong>Label</strong> : ' +
          content +
          '</span>';
      }

      item.classList.add('checkA11YOutline__' + color);
      const spanLabel = document.createElement('span');
      spanLabel.classList.add('checkA11YSpan');
      spanLabel.classList.add('checkA11YSpan__' + color);
      spanLabel.innerHTML = label;
      item.before(spanLabel);
    }
  });

  // RESULT
  nia_linkBottomLine = document.createElement('p');
  nia_linkBottomLine.id = 'checkA11YBottomLine';
  nia_linkBottomLine.textContent =
    'Labels de lien : ' + nia_linkError + ' erreur(s)';
  document.body.appendChild(nia_linkBottomLine);
}

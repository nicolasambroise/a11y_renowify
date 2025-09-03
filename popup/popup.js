/* Script Check A11Y Renowify - Nicolas AMBROISE */

// ===== Globals

const scriptFolder = 'scripts/';
const styleFolder = 'styles/';

// Fonction pour activer un script au clic sur le switch correspondant
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTabId = tabs[0].id;
  console.log('==== Init ====');
  initRenowify(currentTabId);

  //enable click event
  const switchBtn = document.querySelectorAll(
    'input[type="checkbox"][role="switch"][id^="switch-"]'
  );
  for (let i = 0; i < switchBtn.length; i++) {
    switchBtn[i].addEventListener('click', (event) => {
      let switchBtnId = event.target.id.replace('switch-', '');
      console.log('Click > ' + switchBtnId);

      chrome.storage.local.get(['renowifyData'], function (result) {
        if (result.renowifyData != undefined) {
          let previous_storage = result.renowifyData;

          if (previous_storage != switchBtnId) {
            activeSwitch(switchBtnId, true, currentTabId);
            chrome.storage.local.set({ renowifyData: switchBtnId });
            if (previous_storage == '') {
              console.log('$_Storage : "" => ' + switchBtnId);
            } else {
              console.log(
                '$_Storage : ' + previous_storage + ' => ' + switchBtnId
              );
            }
          } else {
            activeSwitch(switchBtnId, false, currentTabId);
            chrome.storage.local.set({ renowifyData: '' });
            console.log('$_Storage : ' + previous_storage + ' => ""');
          }
        } else {
          console.log('==== initialise local storage ====');
          chrome.storage.local.set({ renowifyData: '' });

          activeSwitch(switchBtnId, true, currentTabId);
          chrome.storage.local.set({ renowifyData: switchBtnId });
          console.log('$_Storage : undefined => ' + switchBtnId);
        }
      });
    });
  }
});

function initRenowify(currentTabId) {
  //enable style Renowify
  const e1 = addStyleRenowify(currentTabId);

  //enable script Renowify
  const e2 = addScriptRenowify(currentTabId);

  //enable style tools
  const e3 = addStyleTools(currentTabId);

  //enable script tools
  const e4 = addScriptTools(currentTabId);

  // retrive switch state
  Promise.all([e1, e2, e3, e4]).then(() => {
    retrieveSwitch(currentTabId);
    console.log('Renowify READY !');
  });

  // Recuperer les options (profile)
  chrome.storage.sync.get(['profile'], function (sync) {
    if (sync.profile && sync.profile != undefined && sync.profile != '') {
      console.log('$_Sync : ' + sync.profile);
      if (sync.profile == 'dev') {
        document.getElementById('switch-nc').closest('li').style.display =
          'block';
        document.getElementById('switch-all').closest('li').style.display =
          'block';
      } else {
        document.getElementById('switch-nc').closest('li').style.display =
          'none';
        document.getElementById('switch-all').closest('li').style.display =
          'none';
      }
    }
  });
}

// Fonction pour injecter les CSS ou les retirer
function activeSwitch(switchBtnId, checked, currentTabId) {
  // Déselectionne tous
  console.log('Renowify switch reset');
  resetSwitch();
  chrome.scripting
    .executeScript({
      target: { tabId: currentTabId },
      func: cleanRenowify
    })
    .then(() => {
      // Selectionne actif
      const switchBtn = document.getElementById('switch-' + switchBtnId);
      console.log('ActiveSwitch > ' + switchBtnId + ' : ' + checked);
      if (checked == true) {
        switchBtn.checked = true;
        switchBtn.setAttribute('aria-pressed', checked);

        // Run Renowify
        if (
          switchBtnId == 'redac' ||
          switchBtnId == 'nc' ||
          switchBtnId == 'all'
        ) {
          runRenowify(switchBtnId, currentTabId);
        }
        // Inject JS
        else if (
          switchBtnId == 'images' ||
          switchBtnId == 'lang' ||
          switchBtnId == 'headings' ||
          switchBtnId == 'autocomplete' ||
          switchBtnId == 'link' ||
          switchBtnId == 'table' ||
          switchBtnId == 'tab' ||
          switchBtnId == 'space' ||
          switchBtnId == 'bg'
        ) {
          chrome.scripting.executeScript({
            files: [scriptFolder + 'tools/nia_' + switchBtnId + '.js'],
            target: { tabId: currentTabId }
          });
        } else {
          alert('Switch not configured !');
        }
        addBadge(currentTabId);
      } else {
        removeBadge(currentTabId);
      }
    });
}

// Fonction pour re-injecter les CSS/JS suite au reload de la page / l'ouverture de la popup
chrome.tabs.onUpdated.addListener(function (currentTabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log('==== onUpdated ====');
    initRenowify(currentTabId);
  }
});

function retrieveSwitch(currentTabId) {
  console.log('retrieveSwitch');
  chrome.storage.local.get(['renowifyData'], function (result) {
    if (
      result.renowifyData &&
      result.renowifyData != undefined &&
      result.renowifyData != ''
    ) {
      console.log('$_Storage : ' + result.renowifyData);
      activeSwitch(result.renowifyData, true, currentTabId);
    }
  });
}

function resetSwitch() {
  const switchBtns = document.querySelectorAll(
    'input[type="checkbox"][role="switch"][id^="switch-"]'
  );
  for (let i = 0; i < switchBtns.length; i++) {
    switchBtns[i].checked = false;
    switchBtns[i].removeAttribute('aria-pressed');
  }
}

// ==== Load Style Renowify

function addStyleRenowify(currentTabId) {
  chrome.scripting
    .executeScript({
      target: { tabId: currentTabId },
      func: checkStyleClassInjected
    })
    .then((styleInjected) => {
      if (styleInjected[0].result == false) {
        const d1 = chrome.scripting.insertCSS({
          files: [styleFolder + '/stylePanel.css'],
          target: { tabId: currentTabId }
        });
        const d2 = chrome.scripting.executeScript({
          func: addStyleClassToBody,
          target: { tabId: currentTabId }
        });
        Promise.all([d1, d2]).then(() => {
          console.log('Renowify style injected');
        });
      } else {
        console.log('Renowify style already injected !');
      }
    });
}

// ==== Load Script Renowify

function addScriptRenowify(currentTabId) {
  chrome.scripting
    .executeScript({
      func: checkScriptClassInjected,
      target: { tabId: currentTabId }
    })
    .then((scriptInjected) => {
      if (scriptInjected[0].result == false) {
        const p1 = chrome.scripting.executeScript({
          files: [
            scriptFolder + 'dist/checks.js',
            scriptFolder + 'features/nia_functions.js',
            scriptFolder + 'features/nia_resultpanel.js',
            scriptFolder + 'features/nia_savebdd.js',
            scriptFolder + 'features/nia_savedecla.js',
            scriptFolder + 'features/nia_thirdservices.js',
            scriptFolder + 'renowify.js'
          ],
          target: { tabId: currentTabId }
        });
        const p2 = chrome.scripting.executeScript({
          func: addScriptClassToBody,
          target: { tabId: currentTabId }
        });
        Promise.all([p1, p2]).then(() =>
          console.log('Renowify scripts injected')
        );
      } else {
        console.log('Renowify scripts already injected !');
      }
    });
}

function runRenowify(switchBtnId, currentTabId) {
  console.log('Run : script_' + switchBtnId + '.js');
  chrome.scripting.executeScript({
    files: [scriptFolder + 'script_' + switchBtnId + '.js'],
    target: { tabId: currentTabId }
  });
}

function cleanRenowify() {
  console.log('cleanRenowify');
  const cr_panel = document.getElementById('checkA11YPanel');
  const cr_panelBtn = document.getElementById('checkA11YPanelBtn');
  const cr_bottomLine = document.getElementById('checkA11YBottomLine');
  if (cr_panel != null) {
    cr_panel.remove();
  }
  if (cr_panelBtn != null) {
    cr_panelBtn.remove();
  }
  if (cr_bottomLine != null) {
    cr_bottomLine.remove();
  }
  document.querySelectorAll('.checkA11YSpan').forEach((el) => el.remove());
  const elemList = document.querySelectorAll(
    '[class*="checkA11YOutline"],[class*="nia"]'
  );
  for (let i = 0; i < elemList.length; i++) {
    let el = elemList[i];
    let elClassName;
    let elClassList = new Array();
    for (let j = 0; j < el.classList.length; j++) {
      elClassName = el.classList[j];
      if (
        elClassName.startsWith('checkA11YOutline') ||
        elClassName.startsWith('nia')
      ) {
        elClassList.push(elClassName);
      }
    }
    for (let k = 0; k < elClassList.length; k++) {
      el.classList.remove(elClassList[k]);
    }
  }
  document.body.classList.remove('check-panel-active');
  document.body.classList.remove('tab-style-injected');
  document.body.classList.remove('space-style-injected');
  document.body.classList.remove('bg-style-injected');
}

// ==== Load Tools Script

function addScriptTools(currentTabId) {
  chrome.scripting
    .executeScript({
      func: checkToolsClassInjected,
      target: { tabId: currentTabId }
    })
    .then((toolsInjected) => {
      if (toolsInjected[0].result == false) {
        const t1 = chrome.scripting.executeScript({
          files: [scriptFolder + 'tools/tools.js'],
          target: { tabId: currentTabId }
        });
        const t2 = chrome.scripting.executeScript({
          func: addToolsClassToBody,
          target: { tabId: currentTabId }
        });
        Promise.all([t1, t2]).then(() => console.log('Tools script injected'));
      } else {
        console.log('Renowify tools already injected !');
      }
    });
}

// ==== Load Style Tools

function addStyleTools(currentTabId) {
  chrome.scripting
    .executeScript({
      target: { tabId: currentTabId },
      func: checkStyleClassInjected
    })
    .then((styleInjected) => {
      if (styleInjected[0].result == false) {
        chrome.scripting
          .insertCSS({
            files: [
              styleFolder + 'tools/nia_tab.css',
              styleFolder + 'tools/nia_space.css',
              styleFolder + 'tools/nia_bg.css'
            ],
            target: { tabId: currentTabId }
          })
          .then(() => {
            console.log('Tools styles injected');
          });
      } else {
        console.log('Renowify style already injected !');
      }
    });
}

// ==== Gestion des multi-injections
// Ajoute une classe au <body> pour eviter de relancer le script si le plugin est appelé plusieurs fois

function addStyleClassToBody() {
  document.body.classList.add('renowify-style-injected');
}
function checkStyleClassInjected() {
  return document.body.classList.contains('renowify-style-injected')
    ? true
    : false;
}

function addScriptClassToBody() {
  document.body.classList.add('renowify-script-injected');
}
function checkScriptClassInjected() {
  return document.body.classList.contains('renowify-script-injected')
    ? true
    : false;
}

function addToolsClassToBody() {
  document.body.classList.add('tools-script-injected');
}
function checkToolsClassInjected() {
  return document.body.classList.contains('tools-script-injected')
    ? true
    : false;
}

// ==== Gestion du Badge
function addBadge(currentTabId) {
  chrome.action.setBadgeText({
    tabId: currentTabId,
    text: 'ON'
  });
}

function removeBadge(currentTabId) {
  const switchBtns = document.querySelectorAll(
    'input[type="checkbox"][role="switch"]'
  );
  let isActif = false;
  for (let i = 0; i < switchBtns.length; i++) {
    if (switchBtns[i].checked) {
      isActif = true;
      break;
    }
  }
  if (isActif == false) {
    chrome.action.setBadgeText({
      tabId: currentTabId,
      text: 'OFF'
    });
  }
}

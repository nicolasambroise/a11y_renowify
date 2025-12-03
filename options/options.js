// Saves options to chrome.storage
const saveOptions = () => {
  const profile = document.getElementById('profile').value;
  const debug = document.getElementById('switch-debug').checked;
  const status = document.getElementById('status');
  const password = document.getElementById('password');
  password.removeAttribute('aria-invalid');
  password.closest('.form-group').classList.remove('form-group--error');
  status.textContent = '';

  if (checkSecurity(profile, password.value)) {
    chrome.storage.sync.set({ profile: profile, debug: debug }, () => {
      // Update status to let user know options were saved.
      status.innerHTML = '<p>Vos options ont été sauvegardées.</p>';
      setTimeout(() => {
        status.textContent = '';
        window.close();
      }, 1500);
    });
  } else {
    status.innerHTML = '<p>Mauvais mot de passe !</p>';
    password.setAttribute('aria-invalid', 'true');
    password.closest('.form-group').classList.add('form-group--error');
    password.focus();
  }
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ profile: 'redac', debug: false }, (items) => {
    if(items) {
      document.getElementById('profile').value = items.profile;
      document.getElementById('switch-debug').checked = items.debug;
    }
  });
  togglePassword();
};

// Decrypt Password String
function dec(val) {
  let str = '';
  val
    .replaceAll(/[%#]/gm, '')
    .match(/.{1,4}/g)
    .forEach((sub) => {
      str += String.fromCharCode(parseInt(sub, 16));
    });
  return str;
}

// Fake Security check
function checkSecurity(profile, password) {
  if (
    profile == 'dev' &&
    password !=
      dec(dec('0#03%00023#0030#0%03300%3400250#0300%030003300##230%032#'))
  ) {
    return false;
  }
  return true;
}

const togglePassword = () => {
  const password = document.getElementById('password');
  if (document.getElementById('profile').value != 'dev') {
    password.setAttribute('disabled', 'true');
    password.removeAttribute('aria-invalid');
    password.closest('.form-group').classList.remove('form-group--error');
    password.value = '';
    document.getElementById('status').textContent = '';
  } else {
    password.removeAttribute('disabled');
  }
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('profile').addEventListener('change', togglePassword);

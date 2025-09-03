// Saves options to chrome.storage
const saveOptions = () => {
  const profile = document.getElementById('profile').value;
  const debug = document.getElementById('switch-debug').checked;

  chrome.storage.sync.set(
    { profile: profile, debug: debug},
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Vos options ont été sauvegardées.';
      setTimeout(() => {
        status.textContent = '';
        window.close();
      }, 1500);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { profile: 'dev', debug: false },
    (items) => {
      document.getElementById('profile').value = items.profile;
      document.getElementById('switch-debug').checked = items.debug;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

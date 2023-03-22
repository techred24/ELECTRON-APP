const { ipcRenderer } = require('electron');
const { getCurrentWindow } = require("@electron/remote");
const Store = require('electron-store');
const CryptoJS = require("crypto-js");
// import settings from 'electron-settings'
// const settings = require('electron-settings');
// import crypto from 'crypto'
const store = new Store();
// const cloudup = {
// 	foo: {
// 		type: 'number',
// 		maximum: 100,
// 		minimum: 1,
// 		default: 50
// 	},
// 	bar: {
// 		type: 'string',
// 		format: 'url'
// 	}
// };

// const store = new Store({cloudup});

window.addEventListener('load', () => {
  cancelButton()
  saveButton()

  if (store.has('user')) {
    document.getElementById('cloudup-user').value = store.get('user')
  }

  if (store.has('passwd')) {
    const decipher = CryptoJS.AES.decrypt(
        store.get("passwd"),
        "fotos app"
      );
      let decrypted = decipher.toString(CryptoJS.enc.Utf8);
      document.getElementById('cloudup-passwd').value = decrypted;
  }
})

function cancelButton () {
  const cancelButton = document.getElementById('cancel-button')

  cancelButton.addEventListener('click', () => {
    const prefsWindow = getCurrentWindow();
    prefsWindow.close()
  })
}

function saveButton () {
  const saveButton = document.getElementById('save-button')
  const prefsForm = document.getElementById('preferences-form')

  saveButton.addEventListener('click', () => {
    if (prefsForm.reportValidity()) {
      const encrypted = CryptoJS.AES.encrypt(
        document.getElementById(
        "cloudup-passwd").value,
        "fotos app"
      ).toString();

      store.set('user', document.getElementById('cloudup-user').value)
      store.set('passwd', encrypted)
      const prefsWindow = getCurrentWindow()
      prefsWindow.close()
    } else {
      ipcRenderer.send('show-dialog', {type: 'error', title: 'Fotos app', message: 'Por favor complete los campos requeridos'})
    }
  })
}
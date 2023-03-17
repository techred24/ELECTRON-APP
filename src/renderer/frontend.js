const os = require('os')
const { setIpc, openDirectory, saveFile, openPreferences } = require('./ipcRendererEvents');
const { addImagesEvents, searchImagesEvent, selectEvent } = require('./images-ui');

window.addEventListener('load', () => {
    // document.getElementById('mensaje').innerHTML = 'Message inserted by JS'
    // console.log(os.cpus())
    setIpc();
    addImagesEvents();
    searchImagesEvent();
    selectEvent();
    //openDirectory()
    buttonEvent('open-directory', openDirectory);
    buttonEvent('open-preferences', openPreferences);
    buttonEvent('save-button', saveFile);
});

function buttonEvent(id, func) {
    const openDirectory = document.getElementById(id)
    openDirectory.addEventListener('click', func)
}

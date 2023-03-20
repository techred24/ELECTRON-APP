const { contextBridge, ipcRenderer, remote } = require('electron')
const { addImagesEvents, selectFirstImage, loadImages, clearImages } = require('./images-ui');
const path = require('path');
const { saveImage } = require('./filters');
function setIpc () {
    // If an event is produced, pong will receive an event and an argument. It could receive more arguments
    // The argument awaited is the date from main process
    ipcRenderer.on('load-images', (event, images) => {
        clearImages();
        loadImages(images);
        addImagesEvents();
        selectFirstImage();
        console.log(images);
    });

    ipcRenderer.on('save-image', (event, file) => {
        console.log(file, 'SAVING IMAGE');
        saveImage(file, callbackToShowDialog);
    })
}
function callbackToShowDialog (err) {
    if (err) return showDialog('error', 'Mensaje de error', err.message);
    showDialog('info', 'Mensaje', 'La imagen fue guardada');
}

function openPreferences () {
    // const {BrowserWindow} = window.require("@electron/remote");
    // const {BrowserWindow} = require("@electron/remote");
    const {getGlobal, BrowserWindow, require: nodeRequire} = window.require("@electron/remote");
    const mainWindow = getGlobal('win');
    // const remoteMain = require("@electron/remote/main");
    // remoteMain.enable(preferencesWindow.webContents);
    const preferencesWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'Preferencias',
        center: true,
        modal: true,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    nodeRequire("@electron/remote/main").enable(preferencesWindow.webContents);
    // preferencesWindow.setParentWindow(mainWindow);
    preferencesWindow.once('ready-to-show', () => {
        preferencesWindow.show();
        preferencesWindow.focus();
    });
    preferencesWindow.removeMenu();
    preferencesWindow.loadFile(`./renderer/preferences.html`);
}
// Sending a message to main process
function openDirectory () {
    console.log('sending to main process')
    // The fist argument is the name of the event
    ipcRenderer.send('open-directory');
}

function showDialog(type, title, message) {
    ipcRenderer.send('show-dialog', { type, title, message });
}


function saveFile() {
    const image = document.getElementById('image-displayed').dataset.original;
    console.log(image, 'EL DATASET')
    if(!image) return
    const ext = path.extname(fileUrl(image));
    ipcRenderer.send('open-save-dialog', ext);
}
function fileUrl(str) {
    if (typeof str !== 'string') {
        throw new Error('Expected a string');
    }

    var pathName = path.resolve(str).replace(/\\/g, '/');

    // Windows drive letter must be prefixed with a slash
    if (pathName[0] !== '/') {
        pathName = '/' + pathName;
    }

    return encodeURI('file://' + pathName);
};

module.exports={
    setIpc,
    openDirectory,
    saveFile,
    openPreferences
}
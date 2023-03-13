const { contextBridge, ipcRenderer } = require('electron')
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
        saveImage(file);
    })
}

// Sending a message to main process
function openDirectory () {
    console.log('sending to main process')
    // The fist argument is the name of the event
    ipcRenderer.send('open-directory');
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
    saveFile
}
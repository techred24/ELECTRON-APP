const { ipcMain, dialog } = require('electron');
const fs = require('fs');
const isImage = require('is-image');
const path = require('path');
const { filesize } = require('filesize');

function setMainIpc(win) {
    ipcMain.on('open-directory', async (event) => {
        // console.log(event, 'Evento');
        // console.log(arg, 'Argumento');
        // event.sender.send('pong', new Date());
        try {
            const dir = await dialog.showOpenDialog(win, {
                title: 'Seleccione la nueva ubicación',
                buttonLabel: 'Abrir ubicación',
                properties: ['openDirectory']
            });
            if (dir.filePaths[0]) {
                const images = [];
                fs.readdir(dir.filePaths[0], (err, files) => {
                    if (err) throw err
    
                    files.forEach(file => {
                        let imageFile = path.join(dir.filePaths[0], file)
                        console.log(imageFile, 'RUTA IMAGEN');
                        let stats = fs.statSync(imageFile);
                        console.log(stats.size, 'EL SIZE DE LA IMAGEN');
                        let size = filesize( stats.size, { round: 0} );
                        if (isImage(file)) images.push({ filename: file, src: fileUrl(imageFile), size });
                    });
                    event.sender.send('load-images', images);
                });
            }
        } catch(e) {
            console.log(e);
            console.log('OCURRIO UN ERROR AL SELECCIONAR DIRECTORIO');
        }
    });
    
    ipcMain.on('open-save-dialog', async (event, ext) => {
        console.log(ext);
        let dialogOptions = await dialog.showSaveDialog(win, {
            title: 'Guardar imagen modificada',
            buttonLabel: 'Guardar imagen',
            filters: [{name: 'Images', extensions: [ext.substr(1)]}]
        });
        console.log(dialogOptions, 'FILE OPTS');
        console.log(dialogOptions.filePath, 'FILE PATH');
        if (dialogOptions.filePath) {
            event.sender.send('save-image', dialogOptions.filePath);
        }
    });
    
    ipcMain.on('show-dialog', async (event, { type, title, message }) => {
        dialog.showMessageBox(win, {
            type,
            title,
            message
        });
    });
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

module.exports = setMainIpc;
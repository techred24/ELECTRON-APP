'use strict'

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { devtools } = require('../devtools');
// const installExtension = require('electron-devtools-installer');
// const { REDUX_DEVTOOLS } = require('electron-devtools-installer');

let win;

if(process.env.NODE_ENV === 'development'){
    devtools();
}


app.on('before-quit', () => {
    console.log('Saliendo');
});
app.on('ready', () => {
    // installExtension(REDUX_DEVTOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err));
    win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 700,
        minHeight: 600,
        title: 'Recargas Apolo',
        center: true,
        maximizable: false,
        // backgroundColor: 'black',
        show: false,
        webPreferences: {
            // nodeIntegration: false,
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
        }
    });
    // win.webContents.openDevTools();
    win.removeMenu();
    win.once('ready-to-show', () => {
        win.show();
    });
    // win.on('move', () => {
    //     const position = win.getPosition();
    //     console.log(`Position: ${position}`);
    // });
    win.on('closed', () => {
        win = null;
        app.quit();
    });
    // win.loadURL('http://devdocs.io/');
    // win.loadURL(`file://${__dirname}/index.html`);
    win.loadFile(`./renderer/index.html`);
});

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
        console.log(dir);
    } catch(e) {
        console.log(e);
        console.log('OCURRIO UN ERROR AL SELECCIONAR DIRECTORIO');
    }
});
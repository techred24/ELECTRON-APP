'use strict'

const { app, BrowserWindow, Tray } = require('electron');
const { devtools } = require('../devtools');
// const installExtension = require('electron-devtools-installer');
// const { REDUX_DEVTOOLS } = require('electron-devtools-installer');
const handleErrors = require('./handle-errors');
const setIpcMain = require('./ipcMainEvents');
const os = require('os');
const ElectronStore = require('electron-store');
const path = require('path');
ElectronStore.initRenderer();

global.win ;
global.tray;

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
   global.win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 700,
        minHeight: 600,
        title: 'App fotos',
        center: true,
        maximizable: false,
        // backgroundColor: 'black',
        show: false,
        webPreferences: {
            // enableRemoteModule: true,
            // nodeIntegration: false,
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
        }
    });
    require('@electron/remote/main').initialize()
    require("@electron/remote/main").enable(global.win.webContents)
    setIpcMain(global.win);
    handleErrors(global.win);
    //global.win.webContents.openDevTools();
   global.win.removeMenu();
   global.win.once('ready-to-show', () => {
       global.win.show();
    });
    //global.win.on('move', () => {
    //     const position =global.win.getPosition();
    //     console.log(`Position: ${position}`);
    // });
   global.win.on('closed', () => {
       global.win = null;
        app.quit();
    });
    let icon;
    if (os.platform() === 'win32') icon = path.join(__dirname, 'assets', 'icons', 'tray-icon.ico')
    else path.join(__dirname, 'assets', 'icons', 'tray-icon.png')
    global.tray = new Tray(icon);
    global.setToolTip('Fotos App');
    global.tray.on('click', () => {
        global.win.isVisible() ? global.win.hide() : global.win.show();
    })
    //global.win.loadURL('http://devdocs.io/');
    //global.win.loadURL(`file://${__dirname}/index.html`);
   global.win.loadFile(`./renderer/index.html`);
});

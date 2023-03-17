'use strict'

const { app, BrowserWindow } = require('electron');
const { devtools } = require('../devtools');
// const installExtension = require('electron-devtools-installer');
// const { REDUX_DEVTOOLS } = require('electron-devtools-installer');
const handleErrors = require('./handle-errors');
const setIpcMain = require('./ipcMainEvents');
// const fs = require('fs');
// const isImage = require('is-image');
// const path = require('path');
// const { filesize } = require('filesize');

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
    require("@electron/remote/main").enable(win.webContents)
    setIpcMain(win);
    handleErrors(win);
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

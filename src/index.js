'use strict'

const { app, BrowserWindow } = require('electron');
const { devtools } = require('../devtools');

if(process.env.NODE_ENV === 'development'){
    devtools();
}


app.on('before-quit', () => {
    console.log('Saliendo');
});
app.on('ready', () => {
    let win = new BrowserWindow({
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
            nodeIntegration: true
        }
    });
    win.removeMenu();
    win.once('ready-to-show', () => {
        win.show();
    });
    win.on('move', () => {
        const position = win.getPosition();
        console.log(`Position: ${position}`);
    });
    win.on('closed', () => {
        win = null;
        app.quit();
    });
    // win.loadURL('http://devdocs.io/');
    // win.loadURL(`file://${__dirname}/index.html`);
    console.log(__dirname);
    win.loadFile(`./renderer/index.html`);
});

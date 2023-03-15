const { app, dialog } = require('electron');

function relaunch(win) {
    const errorDialogMessage = dialog.showMessageBox(win, {
        type: 'error',
        title: 'Fotos App',
        message: 'Ocurrió un erro inesperado, se intentará reiniciar la aplicación'
    });
    console.log(errorDialogMessage, 'ERROR');
    if (errorDialogMessage) {
        app.relaunch();
        app.exit(0);
    }
}

function setupErrors(win) {
    win.webContents.on('crashed', () => {
        relaunch(win);
    });
    win.on('unresponsive', () => {
        dialog.showMessageBox(win, {
            type: 'warning',
            title: 'Fotos App',
            message: 'Un proceso está tardando demasiado. Puede esperar o reiniciar la aplicación'
        });
    });

    process.on('uncaughtException', () => {
        relaunch(win);
    });
}

module.exports = setupErrors;
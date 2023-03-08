const { contextBridge, ipcRenderer } = require('electron')

function setIpc () {
    // If an event is produced, pong will receive an event and an argument. It could receive more arguments
    // The argument awaited is the date from main process
    ipcRenderer.on('pong', (event, arg) => {
        console.log(`pong recibido en el frontend \n${arg}`);
    });
}

// Sending a message to main process
function openDirectory () {
    console.log('sending to main process')
    // The fist argument is the name of the event
    ipcRenderer.send('open-directory');
}

module.exports={
    setIpc,
    openDirectory
}
const path = require('path')
const debug = require('electron-debug');

function devtools(){
    debug({
        showDevTools: true
    });
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
    })
}

module.exports = {
    devtools
}
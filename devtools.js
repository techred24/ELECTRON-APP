const path = require('path')

function devtools(){
    console.log(path.join(__dirname, 'node_modules', '.bin', 'electron'))
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
        hardResetMethod: 'exit'
    })
}

module.exports = {
    devtools
}
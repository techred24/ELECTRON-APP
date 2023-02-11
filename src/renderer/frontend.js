// import os from 'os'
const os = require('os')
window.addEventListener('load', () => {
    // document.getElementById('mensaje').innerHTML = 'Message inserted by JS'
    console.log(os.cpus())
    console.log('diferente')
})
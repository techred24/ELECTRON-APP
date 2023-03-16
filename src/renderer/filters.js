const fs = require('fs');
const fse =require('fs-extra');
function applyFilter (filter, currentImage) {
    let imgObj = new Image();
    imgObj.src = currentImage.src;

    filterous.importImage(imgObj, {})
        .applyInstaFilter(filter)
        .renderHtml(currentImage)
}
async function saveImage (fileName, callback) {
    let fileSrc = document.getElementById('image-displayed').src;

    if (fileSrc.indexOf(';base64,' !== -1)) {
        fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFile(fileName, fileSrc, 'base64', callback);
    } else {
        fileSrc = fileSrc.replace('file://', '');
        try {
            await fse.copy(fileSrc, fileName);
        } catch(err) {
            console.log('OCURRIO UN ERROR LA INTENTAR ESCRIBIR EL ARCHIVO');
        }
    }
}

module.exports = {
    applyFilter,
    saveImage
};
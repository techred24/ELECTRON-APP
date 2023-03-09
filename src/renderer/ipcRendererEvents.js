const { contextBridge, ipcRenderer } = require('electron')

function clearImages() {
    const oldImages = document.querySelectorAll('li.list-group-item');
    //Array.from(oldImages)
    //[...oldImages]
    //const nodesArray = Array.prototype.slice.call(oldImages);
    //const nodesArray = [].slice.call(oldImages);
    for (let i = 0, length1 = oldImages.length; i < length1; i++) {
        oldImages[i].parentNode.removeChild(oldImages[i]);
    }
}
function loadImages(images) {
    const imagesList = document.querySelector('ul.list-group');
    images.forEach(({src, filename, size}) => {
        const node = `<li class="list-group-item">
                        <img class="media-object pull-left" src="${src}"  height="32">
                        <div class="media-body">
                        <strong>${filename}</strong>
                        <p>${size}</p>
                        </div>
                    </li>`
                    imagesList.insertAdjacentHTML('beforeend', node);
    });
}

function addImagesEvent() {
    const thumbs = document.querySelectorAll('li.list-group-item');
    [...thumbs].forEach(thumb => thumb.addEventListener('click', function() {
        changeImage(this);
    }))
}

function changeImage(node) {
    if (node) {
        const selected = document.querySelector('li.selected') 
        selected ? selected.classList.remove('selected') : null;
        node.classList.add('selected');
        document.getElementById('image-displayed').src = node.querySelector('img').src;
    } else {
        document.getElementById('image-displayed').src = '';
    }
}

function selectFirstImage() {
    const image = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(image);
}

function setIpc () {
    // If an event is produced, pong will receive an event and an argument. It could receive more arguments
    // The argument awaited is the date from main process
    ipcRenderer.on('load-images', (event, images) => {
        clearImages();
        loadImages(images);
        addImagesEvent();
        selectFirstImage();
        console.log(images);
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
const applyFilter = require('./filters');
const url = require('url');
const path = require('path');

function addImagesEvents() {
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
        const image = document.getElementById('image-displayed');
        image.src = node.querySelector('img').src;
        image.dataset.original = image.src;
        console.log(image.dataset, 'DATASET')
    } else {
        document.getElementById('image-displayed').src = '';
    }
}

function selectFirstImage() {
    const image = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(image);
}

function selectEvent() {
    const select = document.getElementById('filters');
    select.addEventListener('change', function() {
        console.log(this.value);
        applyFilter(this.value, document.getElementById('image-displayed'));
    })
}

function searchImagesEvent() {
    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('keyup', function() {
        const regex = new RegExp(this.value.toLowerCase(), 'gi');
        if (this.value.length > 0) {
            const thumbs = document.querySelectorAll('li.list-group-item img');
            for (let i = 0, length1 = thumbs.length; i < length1; i++) {
                // console.log(url.parse(thumbs[i].src));
                const fileUrl = url.parse(thumbs[i].src);
                const fileName = path.basename(fileUrl.pathname);
                console.log(fileName);
                if (fileName.match(regex)) {
                    thumbs[i].parentNode.classList.remove('hidden');
                } else {
                    thumbs[i].parentNode.classList.add('hidden');
                }
            }
            selectFirstImage();
        } else {
            const hidden = document.querySelectorAll('li.hidden')
            for (let i = 0, length1 = hidden.length; i < length1; i++) {
                hidden[i].classList.remove('hidden');
            }
        }
    })
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

module.exports = {
    addImagesEvents,
    changeImage,
    selectFirstImage,
    selectEvent,
    searchImagesEvent,
    loadImages,
    clearImages
}
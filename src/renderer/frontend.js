const os = require('os')
const url = require('url');
const path = require('path');
window.addEventListener('load', () => {
    // document.getElementById('mensaje').innerHTML = 'Message inserted by JS'
    // console.log(os.cpus())
    addImagesEvents();
    searchImagesEvent();
});

function addImagesEvents() {
    const thumbs = document.querySelectorAll('li.list-group-item');

    for (let i = 0, length1 = thumbs.length; i < length1; i++) {
        thumbs[i].addEventListener('click', function() {
            changeImage(this);
        })
    }
}

function changeImage(node) {
    document.querySelector('li.selected').classList.remove('selected');
    node.classList.add('selected');
    document.getElementById('image-displayed').src = node.querySelector('img').src;
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
        }
    })
}
function selectFirstImage() {
    const image = document.querySelector('li.list-group-item:not(.hidden)');
    changeImage(image);
}
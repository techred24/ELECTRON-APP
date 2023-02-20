const os = require('os')
window.addEventListener('load', () => {
    // document.getElementById('mensaje').innerHTML = 'Message inserted by JS'
    // console.log(os.cpus())
    addImagesEvents();
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
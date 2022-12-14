'use strict'
var isGallery = true

function renderGallery() {
    var imgs = getImgs()
    var strHtmls = imgs.map(img => `
            <img class="gallery-img" src="${img.url}" alt="" data-id="${img.id}" onclick="onImgSelect(${img.id})">
        `
    )
    document.querySelector('.img-container').innerHTML = strHtmls.join('')

}

function onImgSelect(imgId) {
    isGallery = false
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'grid'
    setImg(imgId)
    renderMeme()
}
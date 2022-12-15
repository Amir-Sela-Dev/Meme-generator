'use strict'
var isGallery = true
var isSavedMeme = false

function renderGallery() {
    var imgs = getImgs()
    console.log('imgs', imgs)
    if (isSavedMeme) imgs = getSavedImgs()
    console.log('imgs', imgs)
    var strHtmls = imgs.map(img => `
            <img class="gallery-img" src="${img.url}" alt="" data-id="${img.id}" onclick="onImgSelect(${img.id})">
        `
    )
    document.querySelector('.img-container').innerHTML = strHtmls.join('')

}

function onImgSelect(imgId) {
    isGallery = false
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'flex'
    setImg(imgId)
    renderMeme()
}

function onFlexible() {
    flexibleMeme()
    onImgSelect(getRandomIntInclusive(1, 18))
}

onSavedMemes()
function onSavedMemes() {
    var savedMemes = getSavedMemes()
    console.log('savedMemes', savedMemes)
    savedMemes.forEach(meme => {
        var img = meme.selectedImgId



    });
}

function openSavedMemes() {
    document.querySelector('.gallery').style.display = 'grid'
    document.querySelector('.editor-container').style.display = 'none'

}
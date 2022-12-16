'use strict'
var isGallery = true
var isSavedMeme = false

function renderGallery() {
    var imgs = getImgs()
    if (isSavedMeme) {
        imgs = getSavedImgs()
        var strHtmls = imgs.map(img => `
        
        <img class="gallery-img" src="${img.savedImgUrl}" alt="" data-id="${img.id}" onclick="onSavedImgSelect(${img})">
    `
        )
        document.querySelector('.img-container').innerHTML = strHtmls.join('')
        return
    }
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
    onImgSelect(getRandomIntInclusive(1, 18))
    flexibleMeme()
}

function onSavedMemes() {
    var savedMemes = getSavedMemes()
    console.log('savedMemes', savedMemes)
    savedMemes.forEach(meme => {
        var img = meme.selectedImgId



    });
}


function onOpenGallery() {
    isSavedMeme = false
    document.querySelector('.gallery').style.display = 'grid'
    document.querySelector('.editor-container').style.display = 'none'
    renderGallery()
}



function toggleMenu() {
    console.log('hi')
    document.body.classList.toggle('menu-open')
}

function onFilter(filterBy) {
    setFilter(filterBy)
    renderGallery()
}


function onSavedImgSelect(img) {
    console.log('img', img)
    isGallery = false
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'flex'
    setSavedImg(imgId)
    renderMeme()
}
'use strict'
var isGallery = true
var isSavedMeme = false
var gUploadImg

function renderGallery() {
    var imgs = getImgs()
    if (isSavedMeme) {
        var mems = getSavedMemes()
        var strHtmls = mems.map(meme => {
            return (
                `
            <img class="gallery-img" src="${meme.imgUrl}" alt="" data-id="${meme.selectedImgId}" 
            onclick="onSavedImgSelect('${meme.memeIdx}')">
               `)
        });
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
    isFirstOpen = true
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'flex'
    setImg(imgId)
    renderMeme()
}

function onFlexible() {
    var numOfPic = getRandomIntInclusive(1, 20)
    onImgSelect(numOfPic)
    flexibleMeme(numOfPic)
    renderMeme()
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


function onSavedImgSelect(memeIdx) {
    isFirstOpen = true
    var savedMeme = getSavedMemeById(+memeIdx)
    console.log('savedMeme', savedMeme)
    var { lines, selectedImgId, selectedLineIdx } = savedMeme
    isGallery = false
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'flex'
    setSavedImg(selectedImgId)
    setLineTxt(lines[selectedLineIdx].txt)
    setColor(lines[selectedLineIdx].color)
    setStrokeColor(lines[selectedLineIdx].strokeColor)
    setFontSize(lines[selectedLineIdx].size, true)
    renderMeme()
}

function onImgInput(ev) {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'flex'
    loadImageFromInput(ev, renderImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => onImageReady(img)
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

}

function renderImg(img) {
    // Draw the img on the canvas
    console.log('img', img)
    // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    isUpload = true
    gUploadImg = img
    renderMeme()
}

function getUploadImg() {
    return gUploadImg
}

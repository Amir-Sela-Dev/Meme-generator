'use strict'


var gElCanvas
var gCtx
var gSizeOfRect = 0
var isDownload = false
var isFirstOpen = true
var isUpload = false


function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    addListeners()
    renderGallery()
    renderCanvas()
    renderMeme()
}

function renderCanvas() {
    //Set the backgournd color to grey
    gCtx.fillStyle = '#add8e6'
    //Clear the canvas,  fill it with grey background
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


function drawMeme(imgId, lineIdx, lines) {
    var img = getImgById(imgId)
    var elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach(line => {
            drawText(line, lineIdx, line.location.x || -1, line.location.y || -1)
        });
        if (!isDownload && !isFirstOpen) drawRect(lines[lineIdx].location.y || -1, gSizeOfRect)

    }
}

function drewUploadMeme(imgId, lineIdx, lines) {
    var img = getUploadImg()
    var elImg = img

    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    lines.forEach(line => {
        drawText(line, lineIdx, line.location.x || -1, line.location.y || -1)
    });
    if (!isDownload && !isFirstOpen) drawRect(lines[lineIdx].location.y || -1, gSizeOfRect)


}

function drawText(line, lineIdx, x, y) {
    // var line = lines[lineIdx]
    const { txt, size, align, color, strokeColor } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function renderMeme() {
    var { selectedImgId, selectedLineIdx, lines } = getMeme()
    if (isUpload) {
        drewUploadMeme(selectedImgId, selectedLineIdx, lines)
        return
    }
    drawMeme(selectedImgId, selectedLineIdx, lines)

}



function onSetMemeText(txt) {
    isFirstOpen = false
    setLineTxt(txt)
    renderMeme()
}

function onChangeColor(color) {
    setColor(color)
    renderMeme()
}
function onChangeStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()

}

function onChangeFontSize(num) {
    gSizeOfRect += num
    setFontSize(num)
    renderMeme()
}

function onAddLine() {
    document.querySelector('.meme-text').value = ''
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    const { selectedLineIdx, lines } = getMeme()
    const text = lines[selectedLineIdx].txt
    document.querySelector('.meme-text').value = text
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    const { selectedLineIdx, lines } = getMeme()
    if (lines.length) {
        var text = lines[selectedLineIdx].txt
    } else text = ''
    document.querySelector('.meme-text').value = text
    renderMeme()
}

function onMoveLine(num) {
    moveLine(num)
    renderMeme()
}

function getElCanvas() {
    return gElCanvas
}

function onSave() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    saveMeme(imgDataUrl)
    openModal()
    setTimeout(() => {
        closeModal();
        onOpenGallery()
        isSavedMeme = true
        renderGallery()
    }, 2000)
}

function onOpenSaved() {
    onOpenGallery()
    isSavedMeme = true
    renderGallery()
}

function onDownload(elLink) {
    isDownload = true
    renderMeme()
    setTimeout(() => {
        downloadCanvas(elLink)
        isDownload = false
    }, 1);
}


function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function onAlignLeft() {
    alignLeft()
    renderMeme()
}
function onAlignRight() {
    alignRight()
    renderMeme()
}
function onAlignCenter() {
    alignCenter()
    renderMeme()
}


function restartEditor() {
    document.querySelector('.color').value = "#ffffff"
    document.querySelector('.sroke-color').value = "#000"
    document.querySelector('.meme-text').value = ""
}

function drawRect(y) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(1, (y - 25 - gSizeOfRect), gElCanvas.width, (50 + gSizeOfRect * 1.5))
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()

    // })
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    if (!isMemeClicked(pos)) return

    setCircleDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}




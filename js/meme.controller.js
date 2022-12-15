'use strict'


var gElCanvas
var gCtx


function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    // addListeners()
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

function drawMeme(imgId, lineIdx, lines) {
    var img = getImgById(imgId)
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach(line => {
            drawText(line, lineIdx, line.location.x || -1, line.location.y || -1)
        });

    }
}

function drawText(line, lineIdx, x, y) {
    // var line = lines[lineIdx]
    const { txt, size, align, color } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function renderMeme() {
    var { selectedImgId, selectedLineIdx, lines } = getMeme()

    drawMeme(selectedImgId, selectedLineIdx, lines)
}


function onSetMemeText(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onChangeColor(color) {
    setColor(color)
    renderMeme()
}

function onChangeFontSize(num) {
    setFontSize(num)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onMoveLine(num) {
    moveLine(num)
    renderMeme()
}


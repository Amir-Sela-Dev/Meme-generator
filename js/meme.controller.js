'use strict'


var gElCanvas
var gCtx

init()
function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // resizeCanvas()
    // addListeners()
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
    console.log('img', img)
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(lines, lineIdx, 125, 40)
    }
}

function drawText(lines, lineIdx, x, y) {
    var line = lines[lineIdx]
    console.log('line', line)
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



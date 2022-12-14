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

function drawImg2(num) {
    const elImg = new Image()
    elImg.src = 'img/2.jpg'
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText('Im a meme', 125, 40)
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = "35px Impact";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function renderMeme() {
    drawImg2(1)
}




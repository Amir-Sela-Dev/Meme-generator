'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
{ id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
{ id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
{ id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
{ id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
{ id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
{ id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
{ id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
{ id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
{ id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
{ id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
{ id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
{ id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
{ id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
{ id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'white',
            location: { x: 238, y: 40 }
        }
    ]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getImgById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function setLineTxt(txt) {
    const { selectedLineIdx, lines } = gMeme
    if (gMeme.lines.length === 0) addLine()
    lines[selectedLineIdx].txt = txt
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setColor(color) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].color = color
}

function setFontSize(num) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].size += num
}

function addLine() {
    gMeme.selectedLineIdx++
    if (gMeme.lines.length === 0) gMeme.selectedLineIdx = 0
    var newLine = {
        txt: '',
        size: 30,
        align: 'center',
        color: 'white',
    }
    const { selectedLineIdx } = gMeme
    let x = 238
    let y = 40
    if (selectedLineIdx === 1) y = 440
    if (selectedLineIdx >= 2) y = 240
    newLine.location = { x, y }
    gMeme.lines.push(newLine)
}

function switchLine() {
    gMeme.selectedLineIdx++

    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function deleteLine() {
    var lineIdx = gMeme.selectedLineIdx
    const deleteLine = gMeme.lines.splice(lineIdx, 1)
    if (gMeme.lines.length === 0) gMeme.selectedLineIdx = 0
    switchLine()
}

function moveLine(num) {
    const { selectedLineIdx, lines } = gMeme
    const line = lines[selectedLineIdx]
    line.location.y += num
}

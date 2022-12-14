'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'white'
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
    lines[selectedLineIdx].txt = txt
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId
}
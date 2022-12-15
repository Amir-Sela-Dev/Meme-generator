'use strict'
const STORAGE_KEY = 'memeDB'
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
var gElServiceCanvas = document.getElementById('my-canvas')
var xMiddle = gElServiceCanvas.width / 2
var yMiddle = gElServiceCanvas.height / 2
var canvasHeight = gElServiceCanvas.height
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            color: 'white',
            location: { x: xMiddle, y: 40 }
        }
    ]
}

var gSavedMemes = loadFromStorage(STORAGE_KEY) || [
    {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Im a saved meme!',
                size: 20,
                align: 'center',
                color: 'white',
                location: { x: xMiddle, y: 40 }
            }
        ]
    }

]

var gReadytxt = [
    '2020 in one pic',
    'Back to school vibes',
    'Going into my late 20s:',
    'Feeling like:',
    'After lesson with Asi',
    'My brain feel like:',
    'Are you sure your ok?',
    'Me after a day of work:',
    'Me after a day of school',
    'When im at the beach:',
    'Explain your life in meme',
    'Well done!',
    'Sucsses!',
    'Me after a famely dinner',
    'My life be like:'
]

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
    let x = xMiddle
    let y = 40
    if (selectedLineIdx === 1) y = canvasHeight - 40
    if (selectedLineIdx >= 2) y = yMiddle
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


function flexibleMeme() {
    const txt = gReadytxt[getRandomIntInclusive(0, 14)]
    setLineTxt(txt)
    const color = getRandomColor()
    setColor(color)
    const numOfLines = getRandomIntInclusive(1, 2)
    const size = getRandomIntInclusive(1, 15)
    setFontSize(size)
    if (numOfLines === 2) {
        addLine()
        const txt = gReadytxt[getRandomIntInclusive(0, 14)]
        setLineTxt(txt)
        const color = getRandomColor()
        setColor(color)
        const size = getRandomIntInclusive(1, 15)
        setFontSize(size)
    }
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}


function saveMeme() {
    gSavedMemes.push(gMeme)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function openModal() {
    var elModal = document.querySelector('.saved-modal')
    elModal.classList.add('open-modal')
}

function closeModal() {
    var elModal = document.querySelector('.saved-modal')
    elModal.classList.remove('open-modal')

}

function getSavedMemes() {
    return loadFromStorage(STORAGE_KEY)
}

function getSavedImgs() {
    var saved = getSavedMemes()
    var savedImgs = []
    saved.forEach(meme => {
        var imgIdx = meme.selectedImgId
        var img = getImgById(imgIdx)
        savedImgs.push(img)
    });
    return savedImgs
}
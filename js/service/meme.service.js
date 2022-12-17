'use strict'
const STORAGE_KEY_MEMES = 'memeDB'
const STORAGE_KEY_IMG = 'imgDB'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['politic', 'trump,פוליטיקה, טראמפ ', ''] },
{ id: 2, url: 'img/2.jpg', keywords: ['puppies', 'cute', 'love', ' animal', 'dog', 'גור', 'חמוד', 'אהבה', 'חיה', 'כלב', ''] },
{ id: 3, url: 'img/3.jpg', keywords: ['cute', 'animal', 'dog', 'baby', 'גור', 'חמוד', 'אהבה', 'חיה', 'כלב', 'תינוק', ''] },
{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat', 'computer', 'מצחיק', 'חתול', 'מחשב', ''] },
{ id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby', 'success', 'מצחיק', 'תינוק', 'הצלחה', ''] },
{ id: 6, url: 'img/6.jpg', keywords: ['funny', 'big', 'television', 'tv', 'מצחיק', 'גדול', 'טלוויזיה', ''] },
{ id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby', 'oops', 'מצחיק', 'תינוק', 'ילד', 'אופס', ''] },
{ id: 8, url: 'img/8.jpg', keywords: ['celebrate', 'tv', 'hat', 'wizard', 'מפורסם', 'סלבריטי', 'כובע', 'קוסם', ''] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby', 'laughing', 'grass', 'מצחיק', 'תינוק', 'ילד', 'צוחק', 'דשא', ''] },
{ id: 10, url: 'img/10.jpg', keywords: ['obama', 'celebrate', 'politic', 'אובמה', 'מפורסם', 'סלבריטי', 'פוליטיקה', ''] },
{ id: 11, url: 'img/11.jpg', keywords: ['funny', 'kissing', 'guys', 'fight', 'מצחיק', 'נשיקה', 'מתנשקים', 'בנים', 'קרב', ''] },
{ id: 12, url: 'img/12.jpg', keywords: ['israel', 'celebrate', 'television', 'tv', 'ישראל', 'מפורסם', 'סלבריטי', 'מה אתם היית עושה', ''] },
{ id: 13, url: 'img/13.jpg', keywords: ['smile', 'celebrate', 'movie', 'television', 'tv', , 'מפורסם', 'סלבריטי', 'סרט', 'חיוך', ''] },
{ id: 14, url: 'img/14.jpg', keywords: ['celebrate', 'matrix', 'movie', 'television', 'tv', , 'מפורסם', 'סלבריטי', 'סרט', 'מטריקס', ''] },
{ id: 15, url: 'img/15.jpg', keywords: ['funny', 'celebrate', 'movie', 'television', 'tv', , 'מפורסם', 'סלבריטי', 'סרט', , ''] },
{ id: 16, url: 'img/16.jpg', keywords: ['funny', 'space', 'celebrate', 'movie', 'television', 'tv', , 'מפורסם', 'סלבריטי', 'סרט', 'חלל', ''] },
{ id: 17, url: 'img/17.jpg', keywords: ['potin', 'celebrate', 'politic', 'פוטין', 'מפורסם', 'סלבריטי', 'פוליטיקה', ''] },
{ id: 18, url: 'img/18.jpg', keywords: ['funny', 'kids', 'toy', 'baz', 'woody', 'מצחיק', 'ילד', 'צעצוע', 'באז', 'וודי', ''] },
{ id: 19, url: 'img/19.jpg', keywords: ['funny', 'kids', 'toy', 'baz', 'woody', 'מצחיק', 'ילד', 'צעצוע', 'באז', 'וודי', ''] },
{ id: 20, url: 'img/20.jpg', keywords: ['funny', 'kids', 'toy', 'baz', 'woody', 'מצחיק', 'ילד', 'צעצוע', 'באז', 'וודי', ''] },
];


var gElServiceCanvas = document.getElementById('my-canvas')
var xMiddle = gElServiceCanvas.width / 2
var yMiddle = gElServiceCanvas.height / 2
var canvasHeight = gElServiceCanvas.height
var gFilterBy = ''
var gSavedImgIdx = 1
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']



var gMeme

var gSavedMemes = loadFromStorage(STORAGE_KEY_MEMES) ||
    [
        {
            selectedImgId: 19,
            selectedLineIdx: 0,
            memeIdx: gSavedImgIdx,
            imgUrl: 'img/20.jpg',
            lines: [
                {
                    txt: 'Im a saved meme!',
                    size: 20,
                    align: 'center',
                    color: 'white',
                    strokeColor: 'black',
                    location: { x: xMiddle, y: 40 },
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

_createMeme()

function _createMeme() {
    var meme =
    {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 30,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                location: { x: xMiddle, y: 40 }
            }
        ]
    }
    gMeme = meme
    console.log('gmeme', gMeme)
}
function getMeme() {
    return gMeme
}

function getImgs() {
    const imgs = gImgs.filter((img) => {
        return (img.keywords.includes(gFilterBy));
    });
    return imgs
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

function restartMeme() {
    _createMeme()
    restartEditor()
}


function setImg(imgId) {
    restartMeme()
    gMeme.selectedImgId = imgId
}

function setColor(color) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].color = color
}
function setStrokeColor(color) {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].strokeColor = color
}



function setFontSize(num, value = false) {
    const { selectedLineIdx, lines } = gMeme
    if (value) lines[selectedLineIdx].size = 0
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
    if (selectedLineIdx === 1) y = canvasHeight - 70
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
    restartMeme()
    const txt = gReadytxt[getRandomIntInclusive(0, 14)]
    setLineTxt(txt)
    const color = getRandomColor()
    setColor(color)
    const strokeColor = getRandomColor()
    setStrokeColor(strokeColor)
    const numOfLines = getRandomIntInclusive(1, 2)
    const size = getRandomIntInclusive(25, 40)
    setFontSize(size, true)
    if (numOfLines === 2) {
        addLine()
        const txt = gReadytxt[getRandomIntInclusive(0, 14)]
        setLineTxt(txt)
        const color = getRandomColor()
        setColor(color)
        const strokeColor = getRandomColor()
        setStrokeColor(strokeColor)
        const size = getRandomIntInclusive(25, 40)
        setFontSize(size, true)
    }
    console.log('meme', gMeme)
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY_MEMES, gSavedMemes)
}


function saveMeme(imdUrl) {
    gSavedImgIdx++
    let memeCopy = JSON.parse(JSON.stringify(gMeme))
    memeCopy.imgUrl = imdUrl
    memeCopy.memeIdx = gSavedImgIdx
    gSavedMemes.push(memeCopy)
    saveToStorage(STORAGE_KEY_MEMES, gSavedMemes)
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
    return loadFromStorage(STORAGE_KEY_MEMES)
}
function getSavedImgs() {
    var saved = getSavedMemes()
    console.log('saved', saved)
    var savedImgs = []
    saved.forEach(meme => {
        var imgIdx = meme.selectedImgId
        var img = getImgById(imgIdx)
        var savedImg = meme.imgUrl
        img.savedImgUrl = savedImg
        savedImgs.push(img)
    });
    return savedImgs
}


function downloadCanvas(elLink) {
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    console.log('data', data)
    elLink.href = data // Put it on the link
    // elLink.download = 'shuki' // Can change the name of the file
}


function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSavedImg(imgId) {
    restartMeme()
    gMeme.selectedImgId = imgId

}

function getSavedMemeById(id) {
    const meme = gSavedMemes.find(meme => id === meme.memeIdx)
    return meme
}

function alignLeft() {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].location.x += -20
}
function alignRight() {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].location.x += 20
}

function alignCenter() {
    const { selectedLineIdx, lines } = gMeme
    lines[selectedLineIdx].location.x = xMiddle
}



function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}



function isMemeClicked(clickedPos) {
    console.log('clickedPos', clickedPos)
    const { selectedLineIdx, lines } = gMeme
    const pos = lines[selectedLineIdx].location
    console.log('pos', pos)
    // Calc the distance between two dots
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //If its smaller then the radius of the circle we are inside
    return distance <= gCircle.size
}

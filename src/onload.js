let gCursorRow = 0
let gCursorCol = 0

document.addEventListener('DOMContentLoaded', (event) => {

  let body = document.querySelector('body')
  let vimText = document.getElementById('vim-text')

  unit1.initLesson()


});



function keyHandler(event) {
  let vimText = document.getElementById('vim-text')
  let key = event.key
  switch (key) {
    case 'h':
    case 'j':
    case 'k':
    case 'l':
      hjkl(key)
      break;
  }
}

function hjkl(key) {
  let vimText = document.getElementById('vim-text')
  let newText = getTextContent(vimText)
  newText = removeCursor(newText)
  gCursorCol += 1
  console.log(gCursorCol)
  newText = placeCursor(newText, gCursorCol)
  setTextContent(vimText, newText)

}


function placeCursor(text = '', cursorCol = 0) {
  // takes desired cursor col
  // places within provided text
  // inserts new span at proper location
  let spanPre = '<span class="mode-normal-cursor">'
  let spanPost = '</span>'
  let newText = ''
  cursorCol = (cursorCol >= text.length) ? text.length - 1 : cursorCol
  newText = `${text.substring(0,cursorCol)}${spanPre}${text.charAt(cursorCol)}${spanPost}${text.substring(cursorCol+1)}`
  return newText
}

function getTextContent(textDiv) {
  return textDiv.innerHTML
}

function setTextContent(textDiv, newText) {
  textDiv.innerHTML = newText
}

function removeCursor(text = '') {
  // takes text w/ span, returns text w/o span
  let newText = ''
  newText = text.replace(/<\/?span[^>]*>/g, '')
  return newText
}

//module.exports = {
//  placeCursor: placeCursor,
//  removeCursor: removeCursor,
//  setTextContent: setTextContent,
//  getTextContent: getTextContent,
//}

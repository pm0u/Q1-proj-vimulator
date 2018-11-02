//let vimText = document.getElementById('vim-text')
//let vimTextIH = vimText.innerHTML
let cursorRow = 0;
let cursorCol = 0;


function placeCursor ( text='', cursorCol=0) {
  // takes desired cursor col/row
  // places within provided text
  // inserts new span at proper location
  let spanPre = '<span class="mode-normal-cursor">'
  let spanPost = '</span>'
  let newText = ''
  cursorCol = ( cursorCol >= text.length ? text.length - 1 : cursorCol)
  newText = `${text.substring(0,cursorCol)}${spanPre}${text.charAt(cursorCol)}${spanPost}${text.substring(cursorCol+1)}`
  return newText
}

function removeCursor () {
  // takes text w/ span, returns text w/o span

}

function moveCursor () {
  //gets current position
  // determines if can move to next char
  // changes row value if needed
  // focus on single line for now

}

function setCursor (element, cursorCol=0, cursorRow=0) {
  //parent function for cursor movement actions
  let row = getRow(element,cursorRow)
  row.innerHTML = placeCursor(row.innerHTML, cursorCol)
}

function getRow (element, row=0) {
    return element.children[row]
}

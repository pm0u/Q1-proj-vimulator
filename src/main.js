//let vimText = document.getElementById('vim-text')
//let vimTextIH = vimText.innerHTML
let cursorRow = 0;
let cursorCol = 0;


function placeCursor ( text='', cursorCol=0) {
  // takes desired cursor col/row
  // takes innerHTML
  // inserts new span at proper location
  let spanPre = '<span class="mode-normal-cursor">'
  let spanPost = '</span>'
  let newText = ''
  cursorCol = ( cursorCol >= text.length ? text.length - 1 : cursorCol)


  newText = `${text.substring(0,cursorCol)}${spanPre}${text.charAt(cursorCol)}${spanPost}${text.substring(cursorCol+1)}`

  return newText

}

function removeCursor () {
  //takes innerHTML, removes cursor span text
  //returns clean innerHTML with no cursor span

}

function moveCursor () {
  //gets current position
  // determines if can move to next char
  // changes row value if needed
  // focus on single line for now

}





//document.addEventListener('DOMContentLoaded', (event) => {
  //setCursor() // set initial cursor position




//});
//// function that makes cursor background dark over character




///need event listeners to move this background.... maybe move span in innerHTML?


///keep track of row and col somehow


module.exports = {
  placeCursor: placeCursor
}

document.addEventListener('DOMContentLoaded', (event) => {
let vimText = document.getElementById('vim-text')
let body = document.querySelector('body')
let vimTextIH = vimText.innerHTML
let cursorRow = 0;
let cursorCol = 0;

setCursor(vimText)

body.addEventListener('keydown', function () {})


});

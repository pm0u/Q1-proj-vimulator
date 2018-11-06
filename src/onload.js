document.addEventListener('DOMContentLoaded', (event) => {

//let vimText = document.getElementById('vim-text')
let lesson1 = document.getElementById('u1l1')
let lesson2 = document.getElementById('u1l2')
lesson1.addEventListener('click', doLesson1)
lesson2.addEventListener('click', doLesson2)

//unit1.initLesson()


});

function doLesson2 () {
  unit1.changeLesson(1)
}

function doLesson1 () {
  unit1.changeLesson(0)
}

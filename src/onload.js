document.addEventListener('DOMContentLoaded', (event) => {

//let vimText = document.getElementById('vim-text')
let lesson1 = document.getElementById('u1l1')
let lesson2 = document.getElementById('u1l2')
let save = document.getElementById('save')
let resetLesson = document.getElementById('reset')
let load = document.getElementById('load')
lesson1.addEventListener('click', doLesson1)
lesson2.addEventListener('click', doLesson2)
save.addEventListener('click', saveEntry)
load.addEventListener('click', loadEntry)

});

function doLesson2 (event) {
  unit1.changeLesson(1)
  event.target.blur()

}

function doLesson1 (event) {
  unit1.changeLesson(0)
  event.target.blur()
}

function saveEntry () {
  let userName = prompt("enter a user name to save under", "user1")
  unit1.saveToStorage(userName)
}

function loadEntry () {
  unit1.updateFromStorage()
}

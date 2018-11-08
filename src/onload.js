document.addEventListener('DOMContentLoaded', (event) => {

  //let vimText = document.getElementById('vim-text')
  let lesson1 = document.getElementById('u1l1')
  let lesson2 = document.getElementById('u1l2')
  let save = document.getElementById('save')
  let resetLesson = document.getElementById('reset')
  let load = document.getElementById('load')
  let hintToggle = document.getElementById('hint-toggle')
  let lessonToggle = document.getElementById('lesson-toggle')

  hintToggle.addEventListener('click', toggleDiv)
  lessonToggle.addEventListener('click', toggleDiv)
  lesson1.addEventListener('click', doLesson1)
  lesson2.addEventListener('click', doLesson2)
  save.addEventListener('click', saveEntry)
  load.addEventListener('click', loadEntry)
  resetLesson.addEventListener('click', reset)

  unit1.initLesson()

});

function doLesson2(event) {
  unit1.changeLesson(1)
  event.target.blur()

}

function doLesson1(event) {
  unit1.changeLesson(0)
  event.target.blur()
}

function saveEntry() {
  unit1.promptForSave()
}

function loadEntry() {
  unit1.promptForUpdate()
}

function reset() {
  unit1.resetLesson()
}

function toggleDiv(event) {
  let divClicked = event.target
  let divClickedId = event.target.id
  let lessonDiv = document.getElementById('lessons')
  let hintDiv = document.getElementById('hints')
  let body = document.querySelector('body')
  if (divClickedId === 'lesson-toggle') {
    if (lessonDiv.style.visibility === 'visible' || lessonDiv.style.visibility === '') {
      lessonDiv.style.visibility = 'hidden'
      if (hintDiv.style.visibility === 'hidden') {
        body.style.gridTemplateAreas = '"header header header" "vim vim vim" "footer footer footer"'
      } else {
        body.style.gridTemplateAreas = '"header header header" "vim vim hints" "footer footer footer"'
      }
    } else {
      lessonDiv.style.visibility = 'visible'
      if (hintDiv.style.visibility === 'hidden') {
        body.style.gridTemplateAreas = '"header header header" "lessons vim vim" "footer footer footer"'
      } else {
        body.style.gridTemplateAreas = '"header header header" "lessons vim hints" "footer footer footer"'
      }
    }
  } else {
    if (hintDiv.style.visibility === 'visible' || hintDiv.style.visibility === '') {
      hintDiv.style.visibility = 'hidden'
      if (lessonDiv.style.visibility === 'hidden') {
        body.style.gridTemplateAreas = '"header header header" "vim vim vim" "footer footer footer"'
      } else {
        body.style.gridTemplateAreas = '"header header header" "lessons vim vim" "footer footer footer"'
      }
    } else {
      hintDiv.style.visibility = 'visible'
      if (lessonDiv.style.visibility === 'hidden') {
        body.style.gridTemplateAreas = '"header header header" "vim vim hints" "footer footer footer"'
      } else {
        body.style.gridTemplateAreas = '"header header header" "lessons vim hints" "footer footer footer"'
      }
    }
  }
}

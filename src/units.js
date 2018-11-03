let unit1 = {
    lessons: {
      lesson1: {
        cRow: 0,
        cCol: 0,
        finishCond: {
          cCol: 1,
          cRow: 0
        },
        lessonText: [
          'This is line1',
          'this is line2'
        ],
        keyHandler(event) {
          if (event.key === 'l') {
            unit1.moveCursorR()
          }
        },
        initKeys() {
          console.log('lesson1 initkey')
          document.addEventListener('keydown', this.keyHandler)
        }
      }
    },
  currLesson: 'lesson1',
  genHTML(lessonNum = 'lesson1') {
    let lesson = this.lessons[lessonNum]
    let spanPre = '<span class="mode-normal-cursor">'
    let spanPost = '</span>'
    let newText = []
    if (lesson.cCol >= lesson.lessonText[lesson.cRow].length) {
      lesson.cCol = 0
      lesson.cRow += 1
    }
    for (let i in lesson.lessonText) {
      if (i == lesson.cRow) {
        newText.push(`${lesson.lessonText[lesson.cRow].substring(0,lesson.cCol)}${spanPre}${lesson.lessonText[lesson.cRow].charAt(lesson.cCol)}${spanPost}${lesson.lessonText[lesson.cRow].substring(lesson.cCol+1)}`)
      } else {
        newText.push(lesson.lessonText[i])
      }
    }
    return newText.join('<br>')
  },
  finisher() {},
  saveToStorage() {},
  moveCursorR() {
    this.lessons[this.currLesson].cCol += 1
    let vimText = document.getElementById('vim-text')
    let newHTML = this.genHTML(this.currLesson)
    vimText.innerHTML = newHTML
  },
  initLesson(lessonNum = this.currLesson) {
    let vimText = document.getElementById('vim-text')
    this.lessons[lessonNum].initKeys()
    vimText.innerHTML = this.genHTML(this.currLesson)
  }
}

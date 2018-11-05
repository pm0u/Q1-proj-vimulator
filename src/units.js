let unit1 = {
  name: 'Basic Movement',
  lessons: [{
      name: 'Moving right',
      cRow: 0,
      cCol: 0,
      finishCond: {
        cCol: 47,
        cRow: 0
      },
      finished: 0,
      lessonText: [
        'Move the cursor to the end of the line using "l"'
      ],
      keyHandler(event) {
        if (event.key === 'l') {
          unit1.cursorMove(event.key)
        }
      },
      initKeys() {
        document.addEventListener('keydown', this.keyHandler)
      },
      changes: [{
        cRow: 0,
        cCol: 0,
        finished: 0,
        lessonText: [
          'Move the cursor to the end of the line using "l"'
        ]
      }]
    },
    {
      name: 'Moving Left',
      cRow: 0,
      cCol: 49,
      finishCond: {
        cCol: 0,
        cRow: 0
      },
      lessonText: [
        'Move cursor to the beginning of the line using "h"'
      ],
      keyHandler(event) {
        if (event.key === 'h') {
          unit1.cursorMove(event.key)
        }
      },
      initKeys() {
        document.addEventListener('keydown', this.keyHandler)
      },
      changes: [{
        cRow: 0,
        cCol: 49,
        finished: 0,
        lessonText: [
          'Move cursor to the beginning of the line using "h"'
        ]
      }],
    }
  ],
  currLesson: 0,
  genHTML(lessonNum = 0) {
    let lesson = this.lessons[lessonNum]
    let spanPreLineNo = '<span class="line-no">'
    let spanPre = '<span class="mode-normal-cursor">'
    let spanPost = '</span>'
    let newText = []
    for (let i in lesson.lessonText) {
      if (i == lesson.cRow) {
        newText.push(`${lesson.lessonText[lesson.cRow].substring(0,lesson.cCol)}${spanPre}${lesson.lessonText[lesson.cRow].charAt(lesson.cCol)}${spanPost}${lesson.lessonText[lesson.cRow].substring(lesson.cCol+1)}`)
      } else {
        newText.push(lesson.lessonText[i])
      }
    }
    this.addLineNos(newText)
    return newText.join('<br>')
  },
  finisher() {
    let currLessonForProps = this.lessons[this.currLesson]
    let currFinishCond = currLessonForProps.finishCond
    for (let i in currFinishCond) {
      if (currFinishCond[i] !== currLessonForProps[i]) {
        return false
      }
    }
    currLessonForProps.finished = 1
    return true
  },
  saveToStorage() {},
  cursorMove(key) {
    let activeLesson = unit1.lessons[this.currLesson]
    this.cursorMoverHJKL(key)
    this.writeToTextArea(this.genHTML(this.currLesson))
    this.updateCursorPosDisplay(activeLesson.cRow, activeLesson.cCol)
    if (this.finisher()) {
      console.log('lesson complete!!!!')
    }
  },
  cursorMoverHJKL(key) {
    let activeLesson = unit1.lessons[this.currLesson]
    switch (key) {
      case 'l':
        activeLesson.cCol++
        break
      case 'h':
        activeLesson.cCol--
        break
    }
    if (activeLesson.cCol >= activeLesson.lessonText[activeLesson.cRow].length) {
      activeLesson.cCol--
    } else if (activeLesson.cCol < 0) {
      activeLesson.cCol = 0
    }
  },

  initLesson(lessonNum = this.currLesson) {
    this.lessons[lessonNum].initKeys()
    this.writeToTextArea(this.genHTML(lessonNum))
    this.updateCursorPosDisplay(this.lessons[lessonNum].cRow,this.lessons[lessonNum].cCol)
  },
  changeCurrLesson(lessonNum) {
    this.currLesson = lessonNum
  },
  changeLesson(lessonNum) {
    this.changeCurrLesson(lessonNum)
    this.initLesson()
  },
  changeLessonFromLink(id) {
  },
  writeToTextArea(html) {
    let vimText = document.getElementById('vim-text')
    vimText.innerHTML = html
  },
  resetLesson(lessonNum = this.currLesson) {
    let currLessonForProps = this.lessons[lessonNum]
    let startState = currLessonForProps.changes[0]
    for (let i in startState) {
      currLessonForProps[i] = startState[i]
    }
    this.initLesson()
  },
  updateCursorPosDisplay(row,col) {
    let posDiv= document.getElementById('pos-div')
    posDiv.innerText = `${row+1},${col+1}`
  },
  addLineNos(text) {
    let spanPre = '<span class="line-no">'
    let spanPost = '</span>'
    let lineNosDiv = document.getElementById('line-nos')
    let newText = []

    for (let i=0; i<text.length; i++) {
      newText.push(`${spanPre}${i+1}${spanPost}`)
    }
    lineNosDiv.innerHTML = newText.join('<br>')
  }
}

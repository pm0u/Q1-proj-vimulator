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
      finished: false,
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
      killKeys() {
        document.removeEventListener('keydown', this.keyHandler)
      },
      hints: '<h4>Movement in Vim</h4><p>An important and unique feature of vim to understand is <a href="https://en.wikibooks.org/wiki/Learning_the_vi_Editor/Vim/Modes" target="_blank">modes</a>. Vim will always open in NORMAL mode. Normal mode is for movement and manipulation of text. Movement is controlled by the h j k and l keys. Think of these like arrow keys. The "l" key will move the cursor to the right. Note that the cursor will not wrap to the next line when you reach the end. The numbers at the bottom of the text area represent the current row and column of the cursor and they will change as it moves. Try it out!</p><details><summary>Additional Hints</summary><p> Press the L key repeatedly (or hold) to move the cursor to the end of the line to complete the lesson</p></details><details><summary>Additional Resources</summary><p><a href="https://en.wikibooks.org/wiki/Learning_the_vi_Editor/Vim/Modes" target="_blank">Vim modes from Learning the Vi Editor</a></p></details>',
      changes: [{
        cRow: 0,
        cCol: 0,
        finished: false,
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
      finished: false,
      lessonText: [
        'Move cursor to the beginning of the line using "h"'
      ],
      keyHandler(event) {
        if (event.key === 'h' || event.key === 'l') {
          unit1.cursorMove(event.key)
        }
      },
      initKeys() {
        document.addEventListener('keydown', this.keyHandler)
      },
      killKeys() {
        document.removeEventListener('keydown', this.keyHandler)
      },
      hints: '<h4>Move to the left</h4><p>The "h" key will move the cursor to the left, give it a shot! (the l key will still work if you\'d like to mess around)<details><summary>Additional Hints</summary><p> Press the H key repeatedly (or hold) to move the cursor to the beginning of the line to complete the lesson</p></details>',
      changes: [{
        cRow: 0,
        cCol: 49,
        finished: false,
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
    currLessonForProps.finished = true
    this.lessons[this.currLesson].killKeys()
    return true
  },
  saveToStorage(userName = 'user1') {
    let vimStorage = window.localStorage
    vimStorage.setItem(userName, JSON.stringify(unit1))
  },
  updateFromStorage(userName = 'user1') {
    let vimStorage = window.localStorage
    let unitRetrieved = JSON.parse(vimStorage[userName])
    this.recursiveUpdater(unit1, unitRetrieved)
    this.initLesson()
  },
  recursiveUpdater(object, storageObj) {
    let newObj = object
    for (let i in storageObj) {
      if (typeof storageObj[i] === 'object' || typeof storageObj[i] === 'array') {
        newObj[i] = this.recursiveUpdater(newObj[i], storageObj[i])
      } else {
        newObj[i] = storageObj[i]
      }
    }
    return newObj
  },
  cursorMove(key) {
    let activeLesson = unit1.lessons[this.currLesson]
    this.cursorMoverHJKL(key)
    this.writeToTextArea(this.genHTML(this.currLesson))
    this.updateCursorPosDisplay(activeLesson.cRow, activeLesson.cCol)
    if (this.finisher()) {
      this.finishNotice()
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
    if (this.finishKeyListenerActive) {
      document.removeEventListener('keypress', unit1.finishNoticeKeyListener)
    }
    this.removeFinishDiv()
    this.lessons[lessonNum].initKeys()
    this.writeToTextArea(this.genHTML(lessonNum))
    this.updateCursorPosDisplay(this.lessons[lessonNum].cRow, this.lessons[lessonNum].cCol)
    this.setHints()
  },
  changeCurrLesson(lessonNum) {
    this.currLesson = lessonNum
  },
  changeLesson(lessonNum) {
    let activeLesson = unit1.lessons[this.currLesson]
    activeLesson.killKeys()
    this.changeCurrLesson(lessonNum)
    this.initLesson()
  },
  nextLesson() {
    unit1.changeLesson(unit1.currLesson + 1)
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
  updateCursorPosDisplay(row, col) {
    let posDiv = document.getElementById('pos-div')
    posDiv.innerText = `${row+1},${col+1}`
  },
  setHints() {
    let hintsDiv = document.getElementById('hints-content')
    hintsDiv.innerHTML = unit1.lessons[this.currLesson].hints
  },
  finishNotice() {
    let finishDiv = document.createElement('div')
    let vimContent = document.getElementById('vim-content')
    let vimBox = document.getElementById('vim-box')
    vimContent.className = 'blur'
    finishDiv.className = 'finish-div'
    finishDiv.id = 'finish-div'
    finishDiv.innerHTML = '<h3>Lesson Complete!</h3><p>great job! press <span class=\'emph\'>r</span> to restart this lesson or <span class=\'emph\'>enter</span> to start the next lesson</p>'
    vimBox.appendChild(finishDiv)
    this.finishKeyListenerActive = true
    document.addEventListener('keypress', unit1.finishNoticeKeyListener)
  },
  finishKeyListenerActive: false,
  finishNoticeKeyListener(event) {
    switch (event.key) {
      case 'Enter':
        unit1.nextLesson()
        break
      case 'r':
        unit1.resetLesson()
        break
    }
  },
  removeFinishDiv() {
    let finishDiv = document.getElementById('finish-div')
    let vimContent = document.getElementById('vim-content')
    let vimBox = document.getElementById('vim-box')
    if (document.contains(document.getElementById('finish-div'))) {
      let finishDiv = document.getElementById('finish-div')
      finishDiv.parentNode.removeChild(finishDiv)
    }
    if (vimContent.classList.contains('blur')) {
      vimContent.classList.remove('blur')
    }
  },
  addLineNos(text) {
    let spanPre = '<span class="line-no">'
    let spanPost = '</span>'
    let lineNosDiv = document.getElementById('line-nos')
    let newText = []

    for (let i = 0; i < text.length; i++) {
      newText.push(`${spanPre}${i+1}${spanPost}`)
    }
    lineNosDiv.innerHTML = newText.join('<br>')
  }
}

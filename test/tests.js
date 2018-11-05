const assert = chai.assert
const expect = chai.expect
const should = chai.should()
let vimText = document.getElementById('vim-text')
let lKeyDown = new Event('keydown')
lKeyDown.key = 'l'
let hKeyDown = new Event('keydown')
hKeyDown.key = 'h'

describe('page load', function() {
  it('worked?', function() {
    expect(true).to.equal(true)
  })
})

describe('unit.initLesson()', function() {
  it('puts lesson text on screen', function() {
    unit1.initLesson()
    expect(vimText.innerText).to.equal(unit1.lessons[unit1.currLesson].lessonText.join('\n'))
  })
})

describe('unit.resetLesson()', () => {
  it('puts lesson back to start condition', () => {
    document.dispatchEvent(lKeyDown)
    unit1.resetLesson()
    console.log(unit1.lessons[unit1.currLesson])
    expect(unit1.lessons[unit1.currLesson].lessonText).to.deep.equal(unit1.lessons[unit1.currLesson].changes[0].lessonText)
    expect(unit1.lessons[unit1.currLesson].cCol).to.equal(unit1.lessons[unit1.currLesson].changes[0].cCol)
  })
  it('makes vim text area reflect this', () => {
    expect(vimText.innerHTML).to.equal(unit1.genHTML(0))
  })
})

describe('Lesson 1 -- move right', () => {
  it('moves cursor to right when "l" pressed', () => {
    unit1.resetLesson()
    document.dispatchEvent(lKeyDown)
    expect(unit1.lessons[unit1.currLesson].cCol).to.equal(1)
  })
  it("stops cursor when attempting to move past EOL", () => {
    unit1.resetLesson()
    for (let i = 0; i < 50; i++) {
      document.dispatchEvent(lKeyDown)
    }
    expect(unit1.lessons[unit1.currLesson].cCol).to.equal(unit1.lessons[unit1.currLesson].lessonText[0].length -1)
  })
  it('recognizes when lesson is finished', () => {
    unit1.resetLesson()
    for (let i = 0; i < 12; i++) {
      document.dispatchEvent(lKeyDown)
    }
    expect(unit1.lessons[unit1.currLesson].finished).to.equal(1)

  })
})

describe('Lesson 2 -- move left', () => {
  it('moves cursor to left when h pressed', () => {
    unit1.currLesson = 1
    unit1.initLesson(1)
    document.dispatchEvent(hKeyDown)
    expect(unit1.lessons[1].cCol).to.equal(unit1.lessons[1].lessonText[0].length -2)
  })
  it('stops cursor when attempting to move past beginning of line', () => {
    unit1.resetLesson()
    for (let i = 0; i < 17; i++) {
      document.dispatchEvent(hKeyDown)
    }
    expect(unit1.lessons[1].cCol).to.equal(0)
  })
})

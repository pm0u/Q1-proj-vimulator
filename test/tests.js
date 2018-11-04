const assert = chai.assert
const expect = chai.expect
const should = chai.should()
let vimText = document.getElementById('vim-text')
let lKeyDown = new Event('keydown')
lKeyDown.key = 'l'

describe('page load', function() {
  it('worked?', function() {
    expect(true).to.equal(true)
  })
})

describe('unit.initLesson()', function() {
  it('puts lesson text on screen', function() {
    unit1.initLesson()
    expect(vimText.innerText).to.equal(unit1.lessons.lesson1.lessonText.join('\n'))
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
    expect(vimText.innerHTML).to.equal('<span class="mode-normal-cursor">T</span>his is line1<br>this is line2')
  })
})

describe('moveCursorR()', () => {
  it('moves cursor to right when "l" pressed', () => {
    unit1.initLesson()
    document.dispatchEvent(lKeyDown)
    expect(unit1.lessons.lesson1.cCol).to.equal(1)
  })
  it('wraps line when get to end of line & there is a line after', () => {
    unit1.initLesson()
    for (let i = 0; i < 12; i++) {
      document.dispatchEvent(lKeyDown)
    }
    expect(unit1.lessons.lesson1.cCol).to.equal(0)
    expect(unit1.lessons.lesson1.cRow).to.equal(1)
  })
  //it("stops cursor when attempting to move past available text", () => {
  //  unit1.initLesson()
  //  for (let i = 0; i < 24; i++) { document.dispatchEvent(lKeyDown)}
  //  expect(unit1.lessons.lesson1.cCol).to.equal(12)
  //  expect(unit1.lessons.lesson1.cRow).to.equal(1)
  //})
})

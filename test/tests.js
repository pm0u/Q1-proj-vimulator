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

describe('initLesson()', function() {
  it('puts lesson text on screen', function() {
    unit1.initLesson()
    expect(vimText.innerText).to.equal(unit1.lessons.lesson1.lessonText.join('\n'))
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
    for (let i = 0; i < 12; i++) { document.dispatchEvent(lKeyDown)}
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

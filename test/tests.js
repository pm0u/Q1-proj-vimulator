const chai = require('chai')
const assert = chai.assert
const expect = chai.expect
const should = chai.should()
const main = require('../src/main.js')


describe('setCursor', function () {
  it('returns a string', function () {
    expect(main.placeCursor()).to.be.a('string')
  })
  it('sets cursor at beginning when passed zero', function () {
    expect(main.placeCursor('this is some text')).to.equal('<span class="mode-normal-cursor">t</span>his is some text')
  })
  it('places cursor on 3rd char when passed 2 (0 base index)', function () {
    expect(main.placeCursor('this is some text',2)).to.equal('th<span class="mode-normal-cursor">i</span>s is some text')
  })
  it('places cursor on last character when passed index of last char', function () {
    expect(main.placeCursor('this is some text','this is some text'.length -1)).to.equal('this is some tex<span class="mode-normal-cursor">t</span>')
  })
  it('places cursor at the end when passed value greater than length', function () {
    expect(main.placeCursor('this is some text','this is some text'.length)).to.equal('this is some tex<span class="mode-normal-cursor">t</span>')
  })
})

describe('removeCursor', function () {
  it('should return string', function () {
    expect(main.removeCursor()).to.be.a('string')
  })
  it('should undo placeCursor', function() {
    expect(main.removeCursor(main.placeCursor('hi there'))).to.equal('hi there')
  })
})

/// <reference types="cypress" />

describe('Positive- numbers ', () => {
    it('10 should be a number', () => {
      expect(10).to.not.be.a("string")
    })
  })

  describe('Nagetive- Strings', () => {
    it('15 should not be a string', () => {
      expect(10).to.not.be.a("string")
    })
  })

describe('10 plus 15', () => {
    it('10 plus 15 should eqaute to 25', () => {
      expect(10+15).to.equal(25)
    })
  })

const num1 = Math.floor(Math.random() * 2001) - 1000 // range of -1000 to 1000
const num2 = Math.floor(Math.random() * 2001) - 1000 // range of -1000 to 1000
const letters = Math.random().toString(36).substring(2, 10) // generates a random string of letters between 1 and 6 characters
const num3 = (Math.random() * (999.99 - 0.01) + 0.01).toLocaleString('en-US')
const num4 = (Math.random() * (999.99 - 0.01) + 0.01).toLocaleString('en-US')
const no1 = (Math.random() * (9999.999 - (-9999.999)) - 9999.999).toString()
const no2 = (Math.random() * (9999.999 - (-9999.999)) - 9999.999).toString()


describe("calculator tests", () => {
beforeEach(() => {
  cy.visit("https://testsheepnz.github.io/BasicCalculator")
  cy.get('#selectBuild')
  .select('4')
})
it("Sudetis num1+num2", () => {
  const sum = num1 + num2
  cy.get("#number1Field")
  .click({ force: true })
  .clear()
  .type(num1.toString())

  cy.get("#number2Field")
  .click({ force: true })
  .clear()
  .type(num2.toString())

  cy.get("#selectOperationDropdown")
  .select("Add")

  cy.get("#calculateButton")
  .click({ force: true })

  cy.get("#numberAnswerField")
  .should("have.value", sum.toString())

  cy.get('#clearButton')
  .click()

})
it("atimtis num1-num2", () => {
  const sum = num1 - num2
  cy.get("#number1Field")
  .click({ force: true })
  .clear()
  .type(num1.toString())

  cy.get("#number2Field")
  .click({ force: true })
  .clear()
  .type(num2.toString())

  cy.get("#selectOperationDropdown")
  .select("Subtract")

  cy.get("#calculateButton")
  .click({ force: true })

  cy.get("#numberAnswerField")
  .should("have.value", sum.toString())
})

it("daugyba num1*num2", () => {
  const sum = num1 * num2
  cy.get("#number1Field")
  .click({ force: true })
  .clear()
  .type(num1.toString())

  cy.get("#number2Field")
  .click({ force: true })
  .clear()
  .type(num2.toString())

  cy.get("#selectOperationDropdown")
  .select("Multiply")

  cy.get("#calculateButton")
  .click({ force: true })

  cy.get("#numberAnswerField")
  .should("have.value", sum.toString())
  })
  it("atimtis num1/num2", () => {
    const sum = num1 / num2
    cy.get("#number1Field")
    .click({ force: true })
    .clear()
    .type(num1.toString())

    cy.get("#number2Field")
    .click({ force: true })
    .clear()
    .type(num2.toString())

    cy.get("#selectOperationDropdown")
    .select("Divide")

    cy.get("#calculateButton")
    .click({ force: true })

    cy.get("#numberAnswerField")
    .should("have.value", sum.toString())
  })
  it('sujungtis num1num2', () => {
  
    const expected = `${num1}${num2}`
    
    cy.get('#number1Field')
      .clear()
      .type(num1)
      
    cy.get('#number2Field')
      .clear()
      .type(num2)
      
    cy.get('#selectOperationDropdown')
      .select('Concatenate')
      
    cy.get('#calculateButton')
      .click()
      
    cy.get('#numberAnswerField')
      .should('have.value', expected)
  })

// ABC and '#' starts here

  it('ABC test abc+abc', () => {
  
    let expectopatronum = `${letters}${letters}#`

    cy.get('#number1Field')
      .clear()
      .type(letters)
      
    cy.get('#number2Field')
      .clear()
      .type(letters)
      
    cy.get('#selectOperationDropdown')
      .select('Add')
      
    cy.get('#calculateButton')
      .click()
      
      cy.get('#errorMsgField')
      .should('be.visible', expectopatronum)
  })
  it('ABC test abc-abc', () => {
  
    let expectopatronum = `${letters}${letters}#`

    cy.get('#number1Field')
      .clear()
      .type(letters)
      
    cy.get('#number2Field')
      .clear()
      .type(letters)
      
    cy.get('#selectOperationDropdown')
      .select('Subtract')
      
    cy.get('#calculateButton')
      .click()
      
      cy.get('#errorMsgField')
      .should('be.visible', expectopatronum)
  })

  it('ABC test abc*abc', () => {
  
    let expectopatronum = `${letters}${letters}#`

    cy.get('#number1Field')
      .clear()
      .type(letters)
      
    cy.get('#number2Field')
      .clear()
      .type(letters)
      
    cy.get('#selectOperationDropdown')
      .select('Multiply')
      
    cy.get('#calculateButton')
      .click()
      
      cy.get('#errorMsgField')
      .should('be.visible', expectopatronum)
  })
  it('ABC test abc/abc', () => {
  
let expectopatronum = `${letters}${letters}#`

    cy.get('#number1Field')
      .clear()
      .type(letters)
      
    cy.get('#number2Field')
      .clear()
      .type(letters)
      
    cy.get('#selectOperationDropdown')
      .select('Divide')
      
    cy.get('#calculateButton')
      .click()
      
      cy.get('#errorMsgField')
      .should('be.visible', expectopatronum)
  })
  it('ABC test abcabc', () => {
  
  let expectopatronum = `${letters}${letters}#`
  
    cy.get('#number1Field')
      .clear()
      .type(letters)
      
    cy.get('#number2Field')
      .clear()
      .type(letters +'#')
      
    cy.get('#selectOperationDropdown')
      .select('Concatenate')
      
    cy.get('#calculateButton')
      .click()
      
      cy.get('#errorMsgField')
      .should('be.not.visible')
      cy.get('#numberAnswerField')
      .should('have.value', expectopatronum)

  })
  // Adding . and ,

  
    it("adds two numbers with comma and period", () => {
      const num2 = "1,234.56"
      const num3 = "789.01"
      const sum1 = "2,023.57"
      
      cy.get("#number1Field").type(num2)
      cy.get("#number2Field").type(num3)
      cy.get("#selectOperationDropdown").select("Add")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      cy.get('#errorMsgField')
      .should('be.visible', sum1)
    })
  
      it("adds two numbers with comma and period", () => {
      const num4 = "5.6"
      const num5 = "0,25"
      const sum2 = "1.40"
  
      cy.get("#number1Field").type(num4)
      cy.get("#number2Field").type(num5)
      cy.get("#selectOperationDropdown").select("Add")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      cy.get('#errorMsgField')
      .should('be.visible',sum2)
  
      cy.get("#clearButton").click()
      
    })
    it("adds two numbers with comma and period", () => {
      const num2 = "1,234.56"
      const num3 = "789.01"
      const sum1 = "2,023.57"
      
      cy.get("#number1Field").type(num2)
      cy.get("#number2Field").type(num3)
      cy.get("#selectOperationDropdown").select("Subtract")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      cy.get('#errorMsgField')
      .should('be.visible', sum1)
    })
  
      it("adds two numbers with comma and period", () => {
      const num4 = "5.6"
      const num5 = "0,25"
      const sum2 = "1.40"
  
      cy.get("#number1Field").type(num4)
      cy.get("#number2Field").type(num5)
      cy.get("#selectOperationDropdown").select("Subtract")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      cy.get('#errorMsgField')
      .should('be.visible',sum2)
  
      cy.get("#clearButton").click()
      
    })
    it("adds two numbers with comma and period", () => {
      const num2 = "1,234.56"
      const num3 = "789.01"
      const sum1 = "2,023.57"
      
      cy.get("#number1Field").type(num2)
      cy.get("#number2Field").type(num3)
      cy.get("#selectOperationDropdown").select("Multiply")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      cy.get('#errorMsgField')
      .should('be.visible', sum1)
    })
  
      it("adds two numbers with comma and period", () => {
      const num4 = "5.6"
      const num5 = "0,25"
      const sum2 = "1.40"
  
      cy.get("#number1Field").type(num4)
      cy.get("#number2Field").type(num5)
      cy.get("#selectOperationDropdown").select("Multiply")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      cy.get('#errorMsgField')
      .should('be.visible',sum2)
  
      cy.get("#clearButton").click()
      
    })
    it("adds two numbers with comma and period", () => {
      const num2 = "1,234.56"
      const num3 = "789.01"
      const sum1 = "2,023.57"
      
      cy.get("#number1Field").type(num2)
      cy.get("#number2Field").type(num3)
      cy.get("#selectOperationDropdown").select("Divide")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      cy.get('#errorMsgField')
      .should('be.visible', sum1)
    })
  
      it("adds two numbers with comma and period", () => {
      const num4 = "5.6"
      const num5 = "0,25"
      const sum2 = "1.40"
  
      cy.get("#number1Field").type(num4)
      cy.get("#number2Field").type(num5)
      cy.get("#selectOperationDropdown").select("Divide")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      cy.get('#errorMsgField')
      .should('be.visible',sum2)
  
      cy.get("#clearButton").click()
      
    })
    it("adds two numbers with comma and period", () => {
      const num2 = "1,234.56"
      const num3 = "789.01"
      //const sum1 = "2,023.57"
      
      cy.get("#number1Field").type(num2)
      cy.get("#number2Field").type(num3)
      cy.get("#selectOperationDropdown").select("Concatenate")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
    
      .should('have.value', '1,234.56789.01')
    })
  
      it("adds two numbers with comma and period", () => {
      const num4 = "5.6"
      const num5 = "0,25"
      //const sum2 = "1.40"
  
      cy.get("#number1Field").type(num4)
      cy.get("#number2Field").type(num5)
      cy.get("#selectOperationDropdown").select("Concatenate")
      cy.get("#calculateButton").click()
      cy.get('#numberAnswerField')
      
      .should('have.value','5.60,25')
  
      cy.get("#clearButton").click()
      
    })
      // Generation of many decimal points

      it("multi decimal tests", () => {
        const sum = (parseFloat(no1) + parseFloat(no2)).toFixed(2)
        cy.get("#number1Field")
          .click({ force: true })
          .clear()
          .type(no1.toString())
      
        cy.get("#number2Field")
          .click({ force: true })
          .clear()
          .type(no2.toString())
      
        cy.get("#selectOperationDropdown")
          .select("Add")
      
        cy.get("#calculateButton")
          .click({ force: true })
      
          cy.get("#numberAnswerField")
          .should($input => {
            const actualValue = parseFloat($input.val()).toFixed(2);
            expect(actualValue).to.equal(sum);
          })
          
      })
      it("multi decimal tests", () => {
        const sum = (parseFloat(no1) - parseFloat(no2)).toFixed(2)
        cy.get("#number1Field")
          .click({ force: true })
          .clear()
          .type(no1.toString())
      
        cy.get("#number2Field")
          .click({ force: true })
          .clear()
          .type(no2.toString())
      
        cy.get("#selectOperationDropdown")
          .select("Subtract")
      
        cy.get("#calculateButton")
          .click({ force: true })
      
          cy.get("#numberAnswerField")
          .should($input => {
            const actualValue = parseFloat($input.val()).toFixed(2);
            expect(actualValue).to.equal(sum);
          })
  })
  it("multi decimal tests", () => {
    const sum = (parseFloat(no1) * parseFloat(no2)).toFixed(2);
    cy.get("#number1Field")
      .click({ force: true })
      .clear()
      .type(no1.toString());
  
    cy.get("#number2Field")
      .click({ force: true })
      .clear()
      .type(no2.toString());
  
    cy.get("#selectOperationDropdown").select("Multiply");
  
    cy.get("#calculateButton").click({ force: true });
  
    cy.get("#numberAnswerField").should(($input) => {
      const actualValue = parseFloat($input.val()).toFixed(2);
      expect(Math.abs(actualValue - sum)).to.be.lte(1);
    })
  })
  it("multi decimal tests", () => {
    const sum = (parseFloat(no1) / parseFloat(no2)).toFixed(2);
    cy.get("#number1Field")
      .click({ force: true })
      .clear()
      .type(no1.toString());
  
    cy.get("#number2Field")
      .click({ force: true })
      .clear()
      .type(no2.toString());
  
    cy.get("#selectOperationDropdown").select("Divide");
  
    cy.get("#calculateButton").click({ force: true });
  
    cy.get("#numberAnswerField").should(($input) => {
      const actualValue = parseFloat($input.val()).toFixed(2);
      expect(Math.abs(actualValue - sum)).to.be.lte(1);
    })
  })
  it('multi decimal testssujungtis no1no2', () => {
  
    const expected = `${no1}${no2}`
    
    cy.get('#number1Field')
      .clear()
      .type(no1)
      
    cy.get('#number2Field')
      .clear()
      .type(no2)
      
    cy.get('#selectOperationDropdown')
      .select('Concatenate')
      
    cy.get('#calculateButton')
      .click()
      
    cy.get('#numberAnswerField')
      .should('be.visible')
  })                          
})
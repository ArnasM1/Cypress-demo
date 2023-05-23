describe("calculator tests", () => {
  beforeEach(() => {
    cy.visit("https://testsheepnz.github.io/BasicCalculator");
    cy.get("#selectBuild").select("Prototype");
  });

  it("Addition of two random numbers", () => {
    const num1 = Math.floor(Math.random() * 100000);
    const num2 = Math.floor(Math.random() * 100000);
    const sum = num1 + num2;

    cy.get("#number1Field").clear().type(num1);
    cy.get("#number2Field").clear().type(num2);
    cy.get("#selectOperationDropdown").select("Add");
    cy.get("#calculateButton").click();
    cy.get("#numberAnswerField").should("have.value", sum.toString());
  });

  it("Subtraction of two random numbers", () => {
    const num1 = Math.floor(Math.random() * 100000);
    const num2 = Math.floor(Math.random() * 100000);
    const difference = num1 - num2;

    cy.get("#number1Field").clear().type(num1);
    cy.get("#number2Field").clear().type(num2);
    cy.get("#selectOperationDropdown").select("Subtract");
    cy.get("#calculateButton").click();
    cy.get("#numberAnswerField").should("have.value", difference.toString());
  });

  it("Multiplication of two random numbers", () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const product = num1 * num2;

    cy.get("#number1Field").clear().type(num1);
    cy.get("#number2Field").clear().type(num2);
    cy.get("#selectOperationDropdown").select("Multiply");
    cy.get("#calculateButton").click();
    cy.get("#numberAnswerField").should("have.value", product.toString());
  });

  it("Division of two random numbers", () => {
    const num1 = Math.floor(Math.random() * 100000);
    const num2 = Math.floor(Math.random() * 99) + 1; // ensure num2 is not 0
    const quotient = num1 / num2;

    cy.get("#number1Field").clear().type(num1);
    cy.get("#number2Field").clear().type(num2);
    cy.get("#selectOperationDropdown").select("Divide");
    cy.get("#calculateButton").click();
    cy.get("#numberAnswerField").should("have.value", quotient.toString());
  });

  it("Concatenation of two random numbers", () => {
    const num1 = Math.floor(Math.random() * 100000).toString().substring(0, 6);
    const num2 = Math.floor(Math.random() * 100000).toString().substring(0, 6);
    const expected = num1.concat(num2);

    cy.get("#number1Field").clear().type(num1);
    cy.get("#number2Field").clear().type(num2);
    cy.get("#selectOperationDropdown").select("Concatenate");
    cy.get("#calculateButton").click();
    cy.get("#numberAnswerField").should("have.value", expected);
  });

  it("Addition of two random decimals", () => {
    const num1 = (Math.random() * 100).toFixed(2);
    const num2 = (Math.random() * 100).toFixed(2);
    const sum = parseFloat(num1) + parseFloat(num2);

    cy.get("#number1Field").clear().type(num1);
    cy.get("#number2Field").clear().type(num2);
    cy.get("#selectOperationDropdown").select("Add");
    cy.get("#calculateButton").click();
    cy.get("#numberAnswerField").should("have.value", sum.toString());
    });
    
    it("Subtraction of two random decimals", () => {
    const num1 = (Math.random() * 100).toFixed(2);
    const num2 = (Math.random() * 100).toFixed(2);
    const difference = parseFloat(num1) - parseFloat(num2);
    cy.get("#number1Field").clear().type(num1);
cy.get("#number2Field").clear().type(num2);
cy.get("#selectOperationDropdown").select("Subtract");
cy.get("#calculateButton").click();
cy.get("#numberAnswerField").should("have.value", difference.toString());
});
it("Multiplication of two random decimals", () => {
  const num1 = (Math.random() * 100).toFixed(2);
  const num2 = (Math.random() * 100).toFixed(2);
  const product = (parseFloat(num1) * parseFloat(num2)).toFixed(2);
  cy.get("#number1Field").clear().type(num1);
cy.get("#number2Field").clear().type(num2);
cy.get("#selectOperationDropdown").select("Multiply");
cy.get("#calculateButton").click();
cy.get("#numberAnswerField").should("have.value", product.toString());
});
it("Division of two random decimals", () => {
  const num1 = (Math.random() * 100).toFixed(2);
  const num2 = (Math.random() * 99 + 1).toFixed(2);
  const quotient = (parseFloat(num1) / parseFloat(num2)).toFixed(2);
  cy.get("#number1Field").clear().type(num1);
cy.get("#number2Field").clear().type(num2);
cy.get("#selectOperationDropdown").select("Divide");
cy.get("#calculateButton").click();
cy.get("#numberAnswerField").should("have.value", quotient.toString());
});

it("Concatenation of two random strings", () => {
const str1 = Math.random().toString(36).substring(2, 8);
const str2 = Math.random().toString(36).substring(2, 8);
const expected = str1.concat(str2);
cy.get("#number1Field").clear().type(str1);
cy.get("#number2Field").clear().type(str2);
cy.get("#selectOperationDropdown").select("Concatenate");
cy.get("#calculateButton").click();
cy.get("#numberAnswerField").should("have.value", expected);
});

it("Division by zero should display 'Infinity'", () => {
const num1 = Math.floor(Math.random() * 100000);
const num2 = 0;
const quotient = "Infinity";

cy.get("#number1Field").clear().type(num1);
cy.get("#number2Field").clear().type(num2);
cy.get("#selectOperationDropdown").select("Divide");
cy.get("#calculateButton").click();
cy.get("#numberAnswerField").should("have.value", quotient.toString());
});
});
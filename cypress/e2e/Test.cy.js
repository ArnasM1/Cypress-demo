describe('Checkbox Testing', () => {
  it('Untick all checkboxes except Vilnius', () => {
    cy.visit('https://www.orioninc.com/careers/jobs/?_job_locations=belgrade%2Cbucharest%2Cistanbul%2Cvilnius');

    // Close the cookie banner if it exists
    cy.get('#hs-eu-decline-button').click();

    cy.xpath('//*[@data-region="Europe"]/div')
      .as('checkboxes')
      .then($checkboxes => {
        $checkboxes.each((index, checkbox) => {
          const checkboxValue = checkbox.getAttribute('data-value');
          if (checkboxValue === 'vilnius') {
            // Exclude Vilnius checkbox from unchecking
            cy.wrap(checkbox).should('be.visible');
          } else {
            cy.wrap(checkbox).click();
          }
        });
      });
  });
});
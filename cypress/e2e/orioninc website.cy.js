describe('Orion Inc. Website Navigation', () => {
  it('should navigate to Careers page', () => {
    cy.visit('https://www.orioninc.com/');

    cy.get('#hs-eu-decline-button').click();
    cy.get('#menu-27 > .mobile-link')
      .then((link) => {
        const startCoords = { x: 0, y: 0 };
        const endCoords = { x: 0, y: 0 };
        const duration = 100;
        const steps = 2;

        const deltaX = (endCoords.x - startCoords.x) / steps;
        const deltaY = (endCoords.y - startCoords.y) / steps;

        let x = startCoords.x;
        let y = startCoords.y;

        
        for (let i = 0; i < steps; i++) {
          cy.get('#menu-27 > .mobile-link').trigger('mouseover', { clientX: x, clientY: y });
          x += deltaX;
          y += deltaY;
          cy.wait(duration / steps);
        }
        cy.get('.col-md-4 > .menu-item-2580').click();
      });
    cy.url().should('eq', 'https://www.orioninc.com/careers/');
    cy.get('.is-layout-flex > :nth-child(3)').click()
    cy.url().should('eq', 'https://www.orioninc.com/careers/jobs/?_job_locations=belgrade%2Cbucharest%2Cistanbul%2Cvilnius');


    cy.xpath('//*[@data-region="Europe"]/div')
    .as('checkboxes')
    .then($checkboxes => {
      $checkboxes.each((index, checkbox) => {
        const checkboxValue = checkbox.getAttribute('data-value');
        if (checkboxValue === 'vilnius') {
          // Exclude Vilnius checkbox from unchecking
          cy.wrap(checkbox).should('be.visible');
        } else {
          cy.wrap(checkbox).check();
          cy.get('#search-ajax', { timeout: 10000 }).should('not.exist');
        }
      });
    });
  });
});

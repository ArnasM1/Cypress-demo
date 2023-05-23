// describe('Test Case', () => {
//   it('should select all European city capitals except Vilnius', () => {
//     cy.visit('https://www.orioninc.com/careers/jobs/?_job_locations=belgrade%2Cbucharest%2Cistanbul%2Cvilnius');
//     cy.get('#hs-eu-decline-button').click();
  
//     const cityCapitals = ['amsterdam', 'athens', 'berlin', 'bratislava', 'brussels', 'bucharest', 'budapest', 'copenhagen', 'dublin', 'helsinki', 'kiev', 'lisbon', 'london', 'luxembourg', 'madrid', 'minsk', 'moscow', 'oslo', 'paris', 'prague', 'reykjavik', 'riga', 'rome', 'sarajevo', 'skopje', 'sofia', 'stockholm', 'tallinn', 'tbilisi', 'tirana', 'vienna', 'vilnius', 'warsaw', 'zagreb'];
  
//     cy.get('div.facetwp-checkbox').each(($el) => {
//       const dataValue = $el.attr('data-value');
//       if (dataValue === 'vilnius') {
//         const isChecked = $el.css('content').includes('after');
//         if (isChecked) {
//           cy.wrap($el).click();
//         }
//       } else if (cityCapitals.includes(dataValue)) {
//         const isChecked = $el.css('content').includes('after');
//         if (!isChecked) {
//           cy.wrap($el).click();
//         }
//       }
//     });
//   });
// });
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

    // // Retry until all checkboxes are unchecked again
    // cy.get('.facetwp-checkbox.checked').then(($checkedBoxes) => {
    //   if ($checkedBoxes.length > 0) {
    //     cy.wrap(null).then(() => {
    //       $checkedBoxes.each((index, element) => {
    //         cy.wrap(element).click();
    //       });
    //     }).then(() => {
    //       cy.reload();
    //     });
    //   }
    // });


// describe('Checkbox Testing', () => {
//   it('Untick all checkboxes except Vilnius', () => {
//     cy.visit('https://www.orioninc.com/careers/jobs/?_job_locations=belgrade%2Cbucharest%2Cistanbul%2Cvilnius');
//     cy.get('#hs-eu-decline-button').click();
//     cy.get('div.facetwp-checkbox').each(($el) => {
//       const countryName = $el.attr('data-value');
//       const checkbox = $el.find('input[type="checkbox"]');
      
//       if (countryName === 'vilnius') {
//         checkbox.check({ force: true }); // Ensure Vilnius is checked
//       } else if (checkbox.is(':checked')) {
//         checkbox.uncheck({ force: true }); // Uncheck checked checkboxes
//       }
//     });
//   });
// });


// cy
//   .get('#mytestcheckbox')
//   .as('checkbox')
//   .invoke('is', ':checked')
//   .then(checked => {
//     if (checked) {
//       cy
//         .get('@checkbox')
//         .uncheck();
//     } else {
//       cy
//         .get('@checkbox')
//         .check();
//     }
//   });
// 1. Go to skytech.lt
// 2. Hover on [namu elektronika]
// 3. Click [televizoriai]
// 4. Tick the checkboxes:(Gamintojas) samsung;(Ekrano dydis) 50"+; (SmartTV) TAIP
// 5. Set price range slider(Kaina) to be set to 40% - 80% range
// 6. Click [Keisti]
// 7. 1.Count how many results are displayed. 2. Add last item to the cart. 3. Open the last item from the list

// 8. Click 2nd photo, check if displayed photo changed (visible)
// 9. Click [Komentarai]
// 10. Click [Prisijungę prie savo paskyros]
// 11. Check if successfully redirected (without url.should),
// should be visible: el.pasto adresas, slaptazodis, prisiminti mane,
// "Prisijungti prie savo paskyros su*: ", Facebook and Google buttons. 
// 12. Navigate to previous URL in the browsers history without using the URL (until we see the list of TVs)
// 13. Validate that the count of TVs stayed the same (from step 7)

describe("Skytech.lt Test", () => {
    it("should perform the specified actions", () => {
      let initialItemCount; // Declare the initialItemCount variable
  
      // Step 1 - Go to skytech.lt
      cy.visit("https://skytech.lt");
  
      // Step 2 - Hover on [namu elektronika]
      cy.xpath('//*[@id="navbar"]/li[3]/a').trigger('mouseover');
  
      // Step 3 - Click [televizoriai] while ensuring it is visible
      cy.xpath('/html/body/div[6]/div[1]/div[3]/div[1]/div[3]/ul/li[3]/div/div[1]/div[2]/a')
        .should('be.visible')
        .click();
  
      // Step 4 - Tick the checkboxes
      cy.xpath('//*[@id="f-g-226"]/div[1]').click();
      cy.xpath('//*[@id="f-p-321"]/div[1]').click();
      cy.xpath("//*[@id='f-p-1471']/div[1]").click();
  
      // Step 5 - Set price range slider(Kaina) to be set at 40% - 80%
      cy.xpath('//*[@id="slider-kaina"]/a[1]')
        .invoke("attr", "style", "left: 40%;")
        .invoke("attr", "aria-valuenow", "40")
        .trigger("change");
  
      cy.get('[style="left: 40%;"]').should('be.visible').click();
  
      cy.xpath('//*[@id="slider-kaina"]/a[2]')
        .invoke("attr", "style", "left: 80%;")
        .invoke("attr", "aria-valuenow", "80")
        .trigger("change");
  
      cy.get('[style="left: 80%;"]').should('be.visible').click();
  
      // Step 6 - Click [Keisti]
      cy.xpath('//*[@id="accordion-wrap"]/div/div[59]/div[1]').click();
  
      // Step 7 - Count how many results are displayed
      cy.get('td.count').invoke('text').then((text) => {
        const regex = /(\d+)\s+prekių/;
        const matches = text.match(regex);
        if (matches && matches.length > 1) {
          const initialItemCount = parseInt(matches[1]); // Assign the value to initialItemCount
      
          // Click the last item if it's identified as the last one based on the count number
          if (initialItemCount > 0) {
            const lastItemAddToCartSelector = `:nth-child(${initialItemCount + 1}) > .button-skytech-container > .button-label > .icon-cart`;
            cy.get(lastItemAddToCartSelector).last().click();
      
            // Wait for the item to be added to the cart
            cy.wait(2000);
      
            // Click the image element of the last item if there are items in the list
            const lastItemSelector = '.model .list-image-wrap a img';
            cy.get(lastItemSelector)
              .its('length')
              .then((length) => {
                const lastItemIndex = length - 1; // Calculate the index of the last item
                cy.get(lastItemSelector)
                  .eq(lastItemIndex)
                  .click();
              });
      
            // Store the initialItemCount in Cypress' data for later use
            cy.wrap(initialItemCount).as('initialItemCount');
          } else {
            cy.log('No items in the list');
          }
        } else {
          // Handle the case when the count number cannot be extracted
          cy.log('Count number extraction failed');
        }
      });
    // Step 8 - Click 2nd photo and check if displayed photo changed
    cy.wait(200);
    let previousScreenshotData;
    let previousImageSrc;

    // Capture screenshot of the initial image
    cy.get('img#main-product-image')
      .invoke('attr', 'src')
      .then((initialImageSrc) => {
        previousImageSrc = initialImageSrc;
        cy.log('Initial screenshot taken');
        cy.screenshot({ capture: 'viewport', log: false }).then((screenshotData) => {
          previousScreenshotData = screenshotData;
        });
      });

    // Click on the second image using the XPath selector
    cy.xpath('/html/body/div[6]/div[1]/div[4]/div[2]/div[8]/div[3]/form/table/tbody/tr[3]/td[1]/div/div[1]/table/tbody/tr/td[3]').click();

    // Capture screenshot of the current image
    cy.get('img#main-product-image')
      .invoke('attr', 'src')
      .then((currentImageSrc) => {
        cy.log('Current screenshot taken');
        cy.screenshot({
          capture: 'viewport',
          log: false,
          clip: { x: 0, y: 0, width: 0, height: 0 },
          onBeforeScreenshot($el) {
            const rect = $el[0].getBoundingClientRect();
            return {
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height
            };
          }
        }).then((currentScreenshotData) => {
          expect(currentImageSrc).not.to.equal(previousImageSrc);
        });
      });

    // Step 9 - Click [Komentarai]
    cy.xpath('//*[@id="href-tabs-5"]').click();

    // Step 10 - Click [Prisijungę prie savo paskyros]
    cy.xpath('//*[@id="tabs-5"]/div/div[3]/div[3]/ul/li[1]/a').click();

    // Step 11 - Check if successfully redirected without using URL.
    // Should be visible: el.pasto adresas, slaptazodis, prisiminti mane,
    // "Prisijungti prie savo paskyros su*: ", Facebook and Google buttons.
    cy.xpath('//*[@id="checkout_login_login"]/div[1]/div[1]')
      .should('be.visible');
    cy.xpath('//*[@id="checkout_login_login"]/div[2]/div[1]')
      .should('be.visible');
    cy.xpath('//*[@id="checkout_login_login"]/div[3]/div[2]/label')
      .should('be.visible');
    cy.xpath('//*[@id="checkout_login_login"]/div[4]/div[1]')
      .should('be.visible');
    cy.xpath('//*[@id="facebook-login"]')
      .should('be.visible');
    cy.xpath('//*[@id="google-login"]')
      .should('be.visible');

    // Step 12 - Navigate to previous URL in the browser's history without using the URL (until we see the list of TVs)
    cy.go(-3);
   
// Step 13 - Validate that the count of TVs stayed the same (from step 7)
cy.get('td.count').invoke('text').then((text) => {
    const regex = /(\d+)\s+prekių/;
    const matches = text.match(regex);
    if (matches && matches.length > 1) {
      const currentCount = parseInt(matches[1]);
      cy.log(`Current Count: ${currentCount}`);
  
      // Retrieve the initialItemCount from Cypress' data
      cy.get('@initialItemCount').then((initialItemCount) => {
        if (initialItemCount === currentCount) {
          cy.log('Count of TVs remained the same');
        } else {
          cy.log('Count of TVs changed');
        }
      });
    } else {
      cy.log('Count number extraction failed');
    }
  });
    })
})

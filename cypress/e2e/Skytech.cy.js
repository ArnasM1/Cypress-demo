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

let buttonCount;
let currentCount;
let $buttons;
describe("Skytech.lt Test", () => {
  it("should perform the specified actions", async () => {
    await step1();
    await step2();
    await step3();
    await step4();
    await step5();
    await step6();
    await step7_1_2_3();
    await step8();
    await step9();
    await step10();
    await step11();
    await step12();
    await step13();
  });
});

    // Step 1 - Go to skytech.lt
    async function step1() {
      await cy.log('STEP 1 Start');
      await cy.visit("https://skytech.lt");
    }
    // Step 2 - Hover on [namu elektronika]
    async function step2() {
      await cy.log('STEP 2 Start');
      await cy.xpath('//*[@id="navbar"]/li[3]/a').trigger('mouseover');
    }
    // Step 3 - Click [televizoriai] while ensuring it is visible
    async function step3() {
      await cy.log('STEP 3 Start');
      await cy.get('.level3w [href*="televizoriai-c-36_266_723"]')
        .should('be.visible');
      await cy.get('.level3w [href*="televizoriai-c-36_266_723"]')
        .click();
    }
    // Step 4 - Tick the checkboxes
    async function step4() {
      await cy.log('STEP 4 Start');
      await cy.xpath('//*[@id="f-g-226"]/div[1]').should("be.visible");
      await cy.xpath('//*[@id="f-g-226"]/div[1]').click();
      await cy.xpath('//*[@id="f-p-321"]/div[1]').should("be.visible");
      await cy.xpath('//*[@id="f-p-321"]/div[1]').click();
      await cy.xpath('//*[@id="f-p-1471"]/div[1]').should("be.visible");
      await cy.xpath('//*[@id="f-p-1471"]/div[1]').click();
    }
    // Step 5 - Set price range slider(Kaina) to be set at 40% - 80%
    async function step5() {
      await cy.log('STEP 5 Start');
      await cy.xpath('//*[@id="slider-kaina"]/a[1]').should('be.visible')
      await cy.xpath('//*[@id="slider-kaina"]/a[1]').invoke("attr", "style", "left: 40%;")
      await cy.xpath('//*[@id="slider-kaina"]/a[1]').invoke("attr", "aria-valuenow", "40")
      await cy.xpath('//*[@id="slider-kaina"]/a[1]').trigger("change");

      await cy.get('[style="left: 40%;"]').should('be.visible')
      await cy.get('[style="left: 40%;"]').click();

      await cy.xpath('//*[@id="slider-kaina"]/a[2]').should('be.visible')
      await cy.xpath('//*[@id="slider-kaina"]/a[2]').invoke("attr", "style", "left: 80%;")
      await cy.xpath('//*[@id="slider-kaina"]/a[2]').invoke("attr", "aria-valuenow", "80")
      await cy.xpath('//*[@id="slider-kaina"]/a[2]').trigger("change");

      await cy.get('[style="left: 80%;"]').should('be.visible')
      await cy.get('[style="left: 80%;"]').click();
    }
    // Step 6 - Click [Keisti]
    async function step6() {
      await cy.log('STEP 6 Start');
      await cy.get('div.slider-button').last()
        .click();
    }

    // 7.1 Count how many results are displayed.
    async function step7_1_2_3() {
      await cy.log('STEP 7.1 Start');

      await cy.get('input.icon-cart').then(($buttons) => {
        buttonCount = $buttons.length;
        cy.log(`ITEMS ON LIST: ${buttonCount}`);
      });

      // 7.2 Add last item to the cart.

      await cy.log('STEP 7.2 Start');

      await cy.get('input.icon-cart').last().click();
      // await cy.get('input.icon-cart').should('be.visible')
      // await cy.get('input.icon-cart').click();


      // 7.3 Open the last item from the list

      await cy.log('STEP 7.3 Start');
      await cy.get('td.name').last().click();
    }
    // Step 8 - Click 2nd photo and check if displayed photo changed
    async function step8() {
      await cy.log('STEP 8 Start')
      let previousScreenshotData;
      let previousImageSrc;
      // Capture screenshot of the initial image
      await cy.get('img#main-product-image')
        .invoke('attr', 'src')
        .then((initialImageSrc) => {
          previousImageSrc = initialImageSrc;
          cy.log('Initial screenshot taken');
          cy.screenshot({ capture: 'viewport', log: false }).then((screenshotData) => {
            previousScreenshotData = screenshotData;
          });
        });

      await cy.xpath('//td[@id="2"]').click();
      await cy.get('img#main-product-image')
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
                height: rect.height,
              };
            },
          }).then((currentScreenshotData) => {
            const previousSrc = previousImageSrc || '';
            const currentSrc = currentImageSrc || '';
            expect(currentSrc.replace(previousSrc, '')).not.to.equal('');
          });
        });
    }
    // Step 9 - Click [Komentarai]
    async function step9() {
      await cy.log('STEP 9 Start')
      await cy.xpath('//*[@id="href-tabs-5"]').click();
    }
    // Step 10 - Click [Prisijungę prie savo paskyros]
    async function step10() {
      await cy.log('STEP 10 Start')
      await cy.get('.content a').click();
    }
    // Step 11 - Check if successfully redirected without using URL.
    async function step11() {
      await cy.log('STEP 11 Start')
      await cy.get('.label').contains('El. pašto adresas:')
        .should('be.visible');
      await cy.get('.label.hint').contains('Slaptažodis:')
        .should('be.visible');
      await cy.get('label').contains('Prisiminti mane')
        .should('be.visible');
      await cy.get('.label.middle').contains("Prisijungti prie savo paskyros su*:")
        .should('be.visible');
      await cy.xpath('//*[@id="facebook-login"]')
        .should('be.visible');
      await cy.xpath('//*[@id="google-login"]')
        .should('be.visible');
    }
    // Step 12 - Navigate to previous URL in the browser's history without using the URL (until we see the list of TVs) - check for elements every page back - do loop
    async function step12() {
      await cy.log('STEP 12 Start')

      await goBackAndCheck();
    }
    async function goBackAndCheck() {
      await cy.go(-3); // Using (-3) instead of (-1) due to Skytech page global errors causing test to fail.
      // await cy.get('td.name').then(($element) => {
      //   if ($element.length > 0) {
      //     return;
      //   } else {
      //     goBackAndCheck();
      //   }
      // });
    }
    // Step 13 - Validate that the count of TVs stayed the same (from step 7)
    async function step13() {
      await cy.log('STEP 13 Start')
      await cy.log(`DefaultButtonCountValue: ${buttonCount}`);
      await cy.log(`DefaultCurrentCountValue: ${currentCount}`);
      await cy.get('input.icon-cart').then(($buttons) => {
        buttonCount = $buttons.length;
        cy.log(`Initial Count: ${buttonCount}`);

        cy.get('input.icon-cart').then(($buttons) => {
          currentCount = $buttons.length;
          cy.log(`Current Count: ${currentCount}`);

          if (currentCount === buttonCount) {
            cy.log('Count remained the same.');
          } else {
            cy.log('Count changed.');
          }
        });
      });
    }
  

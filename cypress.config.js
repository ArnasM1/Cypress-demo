const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // projectId: "nygtbm", // Replace with your actual project ID -- /npx cypress run --record --key 611430db-62f8-43bd-8789-aca630b8c918 / https://cloud.cypress.io/projects/nygtbm/settings
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true
  },
  testingType: 'e2e',
  e2e: {
    specPattern: "**/cypress/e2e/*.cy.js", // Add testFiles here
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
      // For example:
      // on('task', {
      //   customTask(data) {
      //     // Custom task implementation
      //     return data;
      //   }
      // });
    },
  },
});

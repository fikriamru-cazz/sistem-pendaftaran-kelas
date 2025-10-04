describe('Smoke Test', () => {
  it('should load the home page and display a welcome message', () => {
    // Visit the root of the web server
    cy.visit('http://localhost:3000');

    // Find an element that contains the text "Welcome!"
    cy.contains('Welcome!');
  });
});

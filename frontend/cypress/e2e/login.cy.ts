describe('Login Flow', () => {
  it('should allow a registered user to log in and be redirected to the dashboard', () => {
    // 1. Visit the login page
    cy.visit('http://localhost:3000/login');

    // 2. Find and type in the email and password fields
    // We use the controlId from the <Form.Group> which becomes the id of the input
    cy.get('#formBasicEmail').type('hafsah@gmail.com');
    cy.get('#formBasicPassword').type('pajak123');

    // 3. Find the submit button and click it
    cy.get('button[type="submit"]').click();

    // 4. Assert that the URL now includes '/dashboard'
    cy.url().should('include', '/dashboard');

    // 5. (Bonus) Assert that the dashboard shows some expected content
    cy.contains('Student Dashboard');
  });
});

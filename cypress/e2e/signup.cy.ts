describe("Signup Page", () => {
  it("should verify email confirmation matches and successfully submit", () => {
    // Test data
    const testEmail = "testuser@example.com";
    const mismatchedEmail = "wronguser@example.com";
    const testPassword = "Password123!";

    cy.visit("http://localhost:8080//signup");

    // Fill out the signup form with matching emails
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="confirmEmail"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // should be redirected to dashboard and have token in localstorage

    cy.reload();

    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="confirmEmail"]').type(mismatchedEmail);
    cy.get('input[name="password"]').type(testPassword);

    cy.get('button[type="submit"]').click();

    // Assert error message for mismatched emails
    cy.contains("Emails do not match").should("be.visible");
  });
});

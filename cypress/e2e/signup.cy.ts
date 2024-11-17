describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/signup");
  });

  it("should verify email confirmation matches and successfully submit", () => {
    const testEmail = "george.bluth@reqres.in";
    const mismatchedEmail = "wronguser@example.com";
    const testPassword = "Passdfgdfword123!";

    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="email_confirm"]').type(mismatchedEmail);
    cy.get('input[name="password"]').type(testPassword);

    cy.get('button[type="submit"]').click();

    // Assert error message for mismatched emails
    cy.contains("Emails do not match").should("be.visible");
    cy.location("pathname").should("not.eq", "/dashboard");

    cy.reload();

    // Fill out the signup form with matching emails
    cy.get('input[name="email"]').type(testEmail);
    cy.get('input[name="email_confirm"]').type(testEmail);
    cy.get('input[name="password"]').type(testPassword);

    // Submit the form
    cy.get('button[type="submit"]').click();
    cy.intercept("POST", "/api/login").as("loginRequest");
    cy.wait("@loginRequest");

    //checks that logged in
    cy.getAllLocalStorage().then((result) => {
      const allValues = Object.values(result);
      const tokenExists = allValues.some((storage) =>
        storage.hasOwnProperty("tok")
      );
      expect(tokenExists).to.be.true; // Assert that 'tok' exists
    });
    cy.location("pathname").should("eq", "/dashboard");

    cy.reload();
  });

  it("should redirect to login page if click on Login button", () => {
    cy.get('[data-test="login-button"]').click();

    cy.wait(1000);

    cy.location("pathname").should("eq", "/login");
  });
});

//Note: Only defined users succeed registration

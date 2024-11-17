describe("Login Page", () => {
  it("should store a token in local storage after successful login", () => {
    const testUsername = "george.bluth@reqres.in";
    const testPassword = "password123";

    cy.visit("http://localhost:8080/login");
    // Cypress.Commands.add('login', (email, password) => { ... })

    cy.get('input[name="username"]').type(testUsername);
    cy.get('input[name="password"]').type(testPassword);

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the login process to complete
    cy.wait(1000);

    // Check for the token in local storage
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.exist;
    });
  });
});

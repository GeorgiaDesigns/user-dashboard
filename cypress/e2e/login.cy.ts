describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/login");
  });

  it("should store a token in local storage after successful login", () => {
    const testUsername = "george.bluth@reqres.in";
    const testPassword = "asdasdasdasdas";

    cy.get('input[name="email"]').type(testUsername);
    cy.get('input[name="password"]').type(testPassword);

    cy.get('button[type="submit"]').click();
    cy.intercept("POST", "/api/login").as("loginRequest");
    cy.wait("@loginRequest");

    cy.getAllLocalStorage().then((result) => {
      const allValues = Object.values(result);
      const tokenExists = allValues.some((storage) =>
        storage.hasOwnProperty("tok")
      );
      expect(tokenExists).to.be.true; // Assert that 'tok' exists
    });
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("should not allow login with inexistent username", () => {
    const testUsername = "test@reqres.in";
    const testPassword = "asdasdasdasdas";

    cy.get('input[name="email"]').type(testUsername);
    cy.get('input[name="password"]').type(testPassword);

    cy.get('button[type="submit"]').click();

    // make sure didnt log in and error message appears
    cy.window().then((win) => {
      const consoleErrorSpy = cy.spy(win.console, "error");
      cy.wrap(consoleErrorSpy).should("have.callCount", 0);
    });

    cy.location("pathname").should("not.eq", "/dashboard");
  });

  it("should redirect to signup page if inexistent username", () => {
    const testUsername = "test@reqres.in";
    const testPassword = "asdasdasdasdas";

    cy.get('input[name="email"]').type(testUsername);
    cy.get('input[name="password"]').type(testPassword);

    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    cy.location("pathname").should("eq", "/signup");
  });

  it("should redirect to signup page if click on Signup button", () => {
    cy.get('[data-test="signup-button"]').click();

    cy.wait(1000);

    cy.location("pathname").should("eq", "/signup");
  });

  it("should not allow login without password", () => {
    const testUsername = "test@reqres.in";

    cy.get('input[name="email"]').type(testUsername);

    cy.get('button[type="submit"]').click();

    // make sure didnt log in and error message appears
    cy.location("pathname").should("not.eq", "/dashboard");
    cy.contains("Password is required");
  });
});

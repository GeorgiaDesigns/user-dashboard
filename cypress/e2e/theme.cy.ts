describe("Theme testing", () => {
  beforeEach(() => {
    // Login to dashboard
    cy.visit("http://localhost:8080/login");

    const testUsername = "george.bluth@reqres.in";
    const testPassword = "asdasdasdasdas";

    cy.get('input[name="email"]').type(testUsername);
    cy.get('input[name="password"]').type(testPassword);

    cy.get('button[type="submit"]').click();
    cy.intercept("POST", "/api/login").as("loginRequest");
    cy.wait("@loginRequest");

    cy.location("pathname").should("eq", "/dashboard");
  });

  it("should add dark class to html", () => {
    // Select dark mode toggle
    cy.get('[data-test-id="dark-mode-toggle"]').click();

    cy.get("html").should("have.class", "dark");

    cy.get('[data-test-id="dark-mode-toggle"]').click();

    cy.get("html").should("not.have.class", "dark");
  });

  it("the theme should be kept even if the application is closed and re-opened", () => {
    cy.reload();
    cy.location("pathname").should("eq", "/dashboard");

    // Retrieve the local storage value for the theme
    cy.getAllLocalStorage().then((result) => {
      const allValues = Object.values(result);
      const themeEnabled = allValues.some((storage) => {
        return storage.darkmode === "enabled";
      });

      if (!themeEnabled) {
        cy.get('[data-test-id="dark-mode-toggle"]').click();
      }

      // Ensure dark mode is applied
      cy.get("html").should("have.class", "dark");

      // Reload the page again to check if the theme persists
      cy.reload();

      // Verify that dark mode is still applied
      cy.get("html").should("have.class", "dark");
    });
  });
});

//data-test="dark-mode-toggle"

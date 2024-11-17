//create user
//delete user
//update user
//pagination
//logout
// check user name

describe("User management actions", () => {
  beforeEach(() => {
    // Check the current pathname
    cy.location("pathname").then((pathname) => {
      if (pathname !== "/dashboard") {
        // Visit the login page
        cy.visit("http://localhost:8080/login");

        const testUsername = "george.bluth@reqres.in";
        const testPassword = "asdasdasdasdas";

        // Fill in the login form
        cy.get('input[name="email"]').type(testUsername);
        cy.get('input[name="password"]').type(testPassword);

        // Intercept the login request and wait for it
        cy.intercept("POST", "/api/login").as("loginRequest");
        cy.get('button[type="submit"]').click();
        cy.wait("@loginRequest");

        // Assert successful navigation to the dashboard
        cy.location("pathname").should("eq", "/dashboard");
      }
    });
  });

  it("should support pagination", () => {
    cy.get('[data-test-id="page-1"]').should("be.visible");
    cy.get('[data-test-id="prev-button"]').should("be.disabled");
    cy.wait(1000);

    // Navigate to the next page
    cy.get('[data-test-id="next-button"]').click();
    cy.get('[data-test-id="page-2"]').should("be.visible");

    // Assert that the previous button is now enabled
    cy.get('[data-test-id="prev-button"]').should("not.be.disabled");

    // Go back to the previous page
    cy.get('[data-test-id="prev-button"]').click();
    cy.get('[data-test-id="page-1"]').should("be.visible");
  });

  it("should have new user after create", () => {
    const newUserName = "New";
    const newUserLastName = "User";
    const newUserEmail = "new.user@reqres.in";

    cy.wait(1000);

    //find create new user button
    cy.get("[data-test-id='create-user']").click();

    //find empty imputs and add values
    cy.get('input[data-test-id="firstname-input"]').type(newUserName);
    cy.get('input[data-test-id="lastname-input"]').type(newUserLastName);
    cy.get('input[data-test-id="email-input"]').type(newUserEmail);

    //find confirm edit button and click
    cy.get("[data-test-id='confirm-edit-button']").click();

    //check that the new user is in the page inside a p tag
    cy.contains(newUserName);
    cy.contains(newUserLastName);
    cy.contains(newUserEmail);
  });

  it("should edit an existing user", () => {
    const newUserName = "Updated";
    const newUserLastName = "User";
    const newUserEmail = "updated.user@reqres.in";

    // Find and click the edit button for an existing user
    cy.get("[data-test-id='edit-button']").first().click();

    // Update the user details
    cy.get('input[data-test-id="firstname-input"]').clear().type(newUserName);
    cy.get('input[data-test-id="lastname-input"]')
      .clear()
      .type(newUserLastName);
    cy.get('input[data-test-id="email-input"]').clear().type(newUserEmail);

    // Confirm the edit
    cy.get("[data-test-id='confirm-edit-button']").click();

    // Wait for changes to take effect
    cy.wait(1000);

    // Assert that the user details are updated
    cy.contains(newUserName).should("exist");
    cy.contains(newUserLastName).should("exist");
    cy.contains(newUserEmail).should("exist");
  });

  it("should delete an existing user", () => {
    let firstUserEmail;
    cy.get("[data-test-id='delete-button']")
      .first()
      .parent()
      .parent()
      .within(() => {
        cy.get("p")
          .invoke("text")
          .then((email) => {
            firstUserEmail = email;
          });
      });

    cy.get("[data-test-id='delete-button']").first().click();

    cy.then(() => {
      cy.contains(firstUserEmail).should("not.exist");
    });
  });

  it("should have the logged in users name", () => {});

  it("should logout", () => {
    cy.location("pathname").should("eq", "/dashboard");

    cy.get('[data-test-id="logout-button"]').click();
    // cy.intercept("POST", "/api/logout").as("logoutRequest");
    // cy.wait("@logoutRequest");

    cy.location("pathname").should("eq", "/login");
  });
});

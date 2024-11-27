const baseUrl = "https://clutch-interview-service.herokuapp.com";

describe("Loan Request", () => {
  it("should be able to request a personal loan", () => {
    cy.intercept("POST", `${baseUrl}/offers`).as("requestOffer");
    cy.intercept("POST", `${baseUrl}/offers`).as("requestOfferAfterUpdate");
    cy.intercept("POST", `${baseUrl}/submissions`).as("submitApplication");

    // Render the fallback UI if userId is not present on the confirmation page
    cy.visit("/confirmation");
    cy.contains(
      /It looks like you haven't completed the loan request yet/i,
    ).should("exist");
    cy.get('a:contains("Go to the form")').click();
    cy.url().should("include", "/");

    // User fills out a form and submits the application
    cy.visit("/");
    cy.contains(/loan information/i);
    cy.get('[data-testid="select-loan-purpose"').click();
    cy.get(".MuiMenuItem-root").contains("Personal").click();

    cy.get('[data-testid="loan-amount"').type("1000");

    cy.get('[data-testid="select-loan-terms"').click();
    cy.get(".MuiMenuItem-root").contains("12 months").click();

    // Offer request
    cy.wait("@requestOffer").its("response.statusCode").should("eq", 201);

    // Display the offer information
    cy.contains(/monthly payment/i).should("exist");
    cy.contains(/APR/i).should("exist");

    // Updates the form
    cy.get('[data-testid="loan-amount"').clear().type("2000");
    cy.get('[data-testid="select-loan-terms"').click();
    cy.get(".MuiMenuItem-root").contains("24 months").click();
    cy.wait("@requestOfferAfterUpdate")
      .its("response.statusCode")
      .should("eq", 201);

    // Display the offer information
    cy.contains(/monthly payment/i).should("exist");
    cy.contains(/APR/i).should("exist");

    // Submit application
    cy.get("button")
      .contains(/submit application/i)
      .click();

    cy.wait("@submitApplication").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      cy.contains(/thank you/i);

      const { userId } = interception.response.body;

      // Get loans from user
      cy.intercept("GET", `${baseUrl}/loans?userId=${userId}`).as(
        "getLoansByUser",
      );

      cy.get('[data-testid="loan-card"').should("exist");

      cy.wait("@getLoansByUser")
        .its("request.url")
        .should("include", `userId=${userId}`);
    });
  });
});

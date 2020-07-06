// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe("Home Page", () => {
  it("test setup and intellisense", () => {
    expect(true).to.true;
    cy.visit("/");
    cy.contains("All Courses");
  });
});

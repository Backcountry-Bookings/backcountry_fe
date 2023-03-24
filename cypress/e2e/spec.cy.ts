/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
  it('doesnt pass', () => {
    cy.get("false")
  })
})
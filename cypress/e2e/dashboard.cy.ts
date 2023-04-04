/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?state_code=CO', { fixture: 'stateCode.json' })
    cy.intercept('GET', 'https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?q=colorado', { fixture: 'q.json' })
    cy.intercept('GET', 'https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?park_name=colorado', { fixture: 'parkName.json' })
    cy.visit('http://localhost:3000/')
  });
  it('should have access to the backcountry bookings website', () => {
    cy.visit('http://localhost:3000/')
  })
  it('should display the websites logo and name on page load', () => {
    cy.get('.logo')
      .should('be.visible')
    cy.get('.site-title')
      .contains(`Backcountry Bookings`)
      .should('be.visible')
  })
  it('should display a dropdown menu for the search bar on page load', () => {
    cy.get('.dropdown')
      .should('be.visible')
      .contains('Select method to search for campgrounds')
  })
  it('should display the search bar on page load', () => {
    cy.get('.search')
      .should('be.visible')
  })
  it('should display the favorites label and section on page load', () => {
    cy.get('.favorites-section')
      .should('be.visible')
    cy.get('.fav-campgrounds-title')
      .should('have.text', 'Your Favorite Campgrounds')
  })
  it('should display the search button on page load', () => {
    cy.get('.search-button')
      .should('be.visible')
      .contains('Search')
  })
  it('should have the search bar disabled if a dropdown is not selected', () => {
    cy.get('.search')
      .should('be.disabled');
    cy.get('.dropdown')
      .select('state_code');
    cy.get('.search')
      .should('be.enabled');
    cy.get('.search')
      .type('test');
    cy.get('.search')
      .should('have.value', 'test')
  });
  it('should show search results for state code when searched', () => {
    cy.get('.dropdown')
      .select('state_code');
    cy.get('.search')
      .type('CO');
    cy.get('.search-button')
      .click()
    cy.get('#7475825B-E844-4012-841B-0E29E05D4540')
      .should('be.visible')
    cy.get('#9FA0E6D0-85F3-4388-92B1-26F408774F28')
      .should('be.visible')
  })
  it('should show search results for campsite name when searched', () => {
    cy.get('.dropdown')
      .select('q');
    cy.get('.search')
      .type('colorado');
    cy.get('.search-button')
      .click()
    cy.get('#3DC83C15-25CE-488E-816B-64FEBB1F79FF')
      .should('be.visible')
  })
  it('should show search results for campsite name when searched', () => {
    cy.get('.dropdown')
      .select('park_name');
    cy.get('.search')
      .type('colorado');
    cy.get('.search-button')
      .click()
    cy.get('#EA81BC45-C361-437F-89B8-5C89FB0D0F86')
      .should('be.visible')
  })
  it('should tell a user to fill out the search if the user clicks search with ', () => {
    cy.get('.dropdown')
      .select('park_name');
    cy.get('.search-button')
      .click()
    cy.get('.search-prompt')
      .should('be.visible')
  })
  it('should handle errors', () => {
    cy.intercept(
      'GET',
      'https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?state_code=CO',
      { statusCode: 500 })
    cy.get('.dropdown')
      .select('state_code');
    cy.get('.search')
      .type('CO');
    cy.get('.search-button')
      .click()
  })
})
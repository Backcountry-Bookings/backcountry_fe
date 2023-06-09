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
  it('should tell a user to fill out the search if the user selects campground name or park without completing the search bar', () => {
    cy.get('.dropdown')
      .select('park_name');
    cy.get('.search-button')
      .click()
    cy.get('.search-prompt')
      .should('be.visible')
  })
  it('should tell a user to fill out the search bar in the correct format if the user clicks search on state code without the correct format', () => {
    cy.get('.dropdown')
      .select('state_code');
    cy.get('.search')
      .type('alabama');
    cy.get('.search-button')
      .click()
    cy.get('.state-code-prompt')
      .should('be.visible')
  })
  it('should display an error component when a search result has no matching campsites', () => {
    cy.get('.dropdown')
      .select('state_code');
    cy.get('.search')
      .type('te');
    cy.get('.search-button')
      .click()
    cy.get('.error-gif')
      .should('be.visible')
  })
  it('should display favorites on the dashboard when they are favorited from the results page', () => {
    cy.get('.dropdown')
      .select('park_name');
    cy.get('.search')
      .type('colorado');
    cy.get('.search-button')
      .click()
    cy.get('#EA81BC45-C361-437F-89B8-5C89FB0D0F86')
      .find('.favorite-button')
      .click()
    cy.get('.site-title')
      .click()
    cy.get('#EA81BC45-C361-437F-89B8-5C89FB0D0F86')
      .should('be.visible')
  })
  it('should remove a favorite campground from the dashboard display when the remove button is clicked', () => {
    cy.get('.dropdown')
      .select('park_name');
    cy.get('.search')
      .type('colorado');
    cy.get('.search-button')
      .click()
    cy.get('#EA81BC45-C361-437F-89B8-5C89FB0D0F86')
      .find('.favorite-button')
      .click()
    cy.get('.site-title')
      .click()
    cy.get('#EA81BC45-C361-437F-89B8-5C89FB0D0F86')
      .find('.unfavorite-button')
      .click()
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
    cy.get('p')
      .contains('There may have been an issue')
  })
  it('should display your location', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .callsFake((successCallback) => {
          const fakePosition = {
            coords: {
              latitude: 40.0170553,
              longitude: -105.0889
            }
          }
          successCallback(fakePosition);
        })
    })
    cy.get('.geolocation-msg')
    .contains('Your location:')
  })
  it('should have a campgrounds near me button', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .callsFake((successCallback) => {
          const fakePosition = {
            coords: {
              latitude: 40.0170553,
              longitude: -105.0889
            }
          }
          successCallback(fakePosition);
        })
    })
    cy.get('#geoButton')
    .contains('Campgrounds Near Me')
  })
  it('should bring not bring up camps if theres none near you', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .callsFake((successCallback) => {
          const fakePosition = {
            coords: {
              latitude: 40.0170553,
              longitude: -105.0889
            }
          }
          successCallback(fakePosition);
        })
    })
    cy.intercept('GET', 'https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?by_dist=40.0170553,-105.0889')
    cy.get('#geoButton')
    .click()
    cy.get('#F7CE47A2-A770-449F-8085-0DF17DD432EB > .card-name')
    .contains('Longs Peak Camp')
  })
  it('it should show an error if there are no sites near you', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .callsFake((successCallback) => {
          const fakePosition = {
            coords: {
              latitude: 41.6885222,
              longitude: -72.7591813
            }
          }
          successCallback(fakePosition);
        })
    })
    cy.intercept('GET', 'https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?by_dist=41.6885222, -72.7591813')
    cy.get('#geoButton')
    .click()
    cy.get('.error-msg')
    .contains('There may have been an issue with your search')
  })
})
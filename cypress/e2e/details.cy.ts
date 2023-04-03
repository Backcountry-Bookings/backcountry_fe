describe('details page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.intercept({
            url: 'https://backcountry-bookings-be.herokuapp.com/api/v1/campsites?state_code=CO',
            method: 'GET'
        }, { fixture: 'stateCode' }
        )
        cy.intercept({
            url: 'https://backcountry-bookings-be.herokuapp.com/api/v1/campsites/7475825B-E844-4012-841B-0E29E05D4540',
            method: 'GET'
        }, { fixture: 'details' })
        cy.get('#search-dropdown')
            .select('State Code')
        cy.get('.search')
            .type('CO')
        cy.get('.search-button')
            .click()
        cy.get(':nth-child(1) > a > .card-button')
            .click()
    })

    it('should go to the results page', () => {
        cy.get('.cg-desc')
            .contains('Aspenglen Campground is reservation only')
            cy.get('.cg-details-copy-section > :nth-child(1)')
            .contains('Cost per night: $30.00')
    })
    it('should have a favorites button', () => {
        cy.get('.card-button')
        .contains('Add to Favorites')
    })
    it('should have a remove from favorites if it is already a favorite', () => {
        cy.get('.card-button')
        .contains('Add to Favorites')
        .click()
        .contains('Remove Favorite')
    })
    it('should have a review section', () => {
        cy.get('.cg-review-section')
        cy.get('.user-review-form > h3')
        .contains('Review this campground')
    })
})
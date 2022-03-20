import { login } from './utils'

describe('Search', () => {
  it('Should log in programmatically without using the UI', () => {
    login()

    cy.visit('/web')
  })

  it('Should log the user out of the web app', () => {
    cy.url().should('not.include', '/login')

    cy.get('#profile-menu').click()
    cy.get('#logout').click()

    cy.url().should('include', '/login')
    cy.visit('/web')
    cy.url().should('include', '/login')
  })
})

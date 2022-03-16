import { login } from './utils'

describe('Search', () => {
  it('Should log in programmatically without using the UI', () => {
    login()

    cy.visit('/')
  })

  it('Should log the user out of the web app', () => {
    cy.url().should('not.include', '/login')

    cy.get('#profile-menu').click()
    cy.get('#logout').click()

    cy.url().should('include', '/login')
    cy.visit('/')
    cy.url().should('include', '/login')
  })
})

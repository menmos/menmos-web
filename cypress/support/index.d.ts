/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to compare snapshot of a page or element
     * @example cy.compareSnapshot('home-page')
     */
    compareSnapshot(value?: string): Chainable<any>
  }
}

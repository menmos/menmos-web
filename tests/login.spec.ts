describe('Login', () => {
  it('Should go to the login page automatically', () => {
    cy.visit('/web')

    cy.url().should('include', '/login')
  })

  it('Should not authenticate a user with invalid credentials', () => {
    cy.get('#username').type('invalid_username').should('have.value', 'invalid_username')
    cy.get('#password').type('invalid_password').should('have.value', 'invalid_password')

    // TODO: Move menmos URL to an env var
    cy.intercept('POST', 'http://localhost:3030/auth/login', {
      statusCode: 401
    }).as('login')

    cy.get('#btn-login').click()

    cy.wait('@login')

    cy.url().should('include', '/login')

    cy.get('#username').clear()
    cy.get('#password').clear()
  })

  it('Should authenticate the user without error', () => {
    cy.get('#username').type('admin').should('have.value', 'admin')
    cy.get('#password').type('admin').should('have.value', 'admin')

    cy.intercept('POST', 'http://localhost:3030/auth/login', {
      statusCode: 200,
      body: {
        token: 'abeautifulandsupersecuretoken'
      }
    }).as('login')

    cy.get('#btn-login').click()

    cy.wait('@login')

    cy.url().should('not.include', '/login')
  })
})

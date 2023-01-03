describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Harry',
      name: 'Harry Potter',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('Application Login')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('Harry')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()
      cy.contains('Harry Potter logged in')
    })

    it.only('login fails with wrong password', function() {
      cy.contains('Login').click()
      cy.get('#username-input').type('Harry')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()
      
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      
      cy.get('html').should('not.contain', 'Harry Potter logged in')
    })

    it.only('login fails with wrong username', function() {
      cy.contains('Login').click()
      cy.get('#username-input').type('Hermione')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()
      
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      
      cy.get('html').should('not.contain', 'Harry Potter logged in')
    })
  })
})
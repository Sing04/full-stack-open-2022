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

    it('login fails with wrong password', function() {
      cy.contains('Login').click()
      cy.get('#username-input').type('Harry')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()
      
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      
      cy.get('html').should('not.contain', 'Harry Potter logged in')
    })

    it('login fails with wrong username', function() {
      cy.contains('Login').click()
      cy.get('#username-input').type('Hermione')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()
      
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      
      cy.get('html').should('not.contain', 'Harry Potter logged in')
    })
  })

  describe('When user is logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Harry', password: 'password'})
    })

    it('A blog can be created with valid information', function() {
      cy.get('.toggable-button')
        .contains('New Blog')
        .click()
      
      cy.get('#blog-title').type('First blog post')
      cy.get('#blog-author').type('Albus Dumbledore')
      cy.get('#blog-url').type('www.google.com')
      cy.get('#create-blog').click()

      cy.contains('First blog post Albus Dumbledore')
      cy.get('.notification')
        .should('contain', 'A new blog First blog post by Albus Dumbledore added!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('Blog creation: error message for blog with no title', function() {
      cy.get('.toggable-button')
        .contains('New Blog')
        .click()
      
      cy.get('#blog-author').type('Albus Dumbledore')
      cy.get('#blog-url').type('www.google.com')
      cy.get('#create-blog').click()

      cy.should('not.contain', 'First blog post Albus Dumbledore')
      cy.get('.notification')
        .should('contain', 'Must provide a title')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'Severus Snape', url: 'www.google.com'})
        cy.createBlog({ title: 'second blog', author: 'Hermione Granger', url: 'www.google.com'})
        cy.createBlog({ title: 'third blog', author: 'Dobey', url: 'www.google.com'})
      })
      it('User can like one blog', function() {
        cy.contains('second blog Hermione Granger')
          .parent()
          .as('parentDiv')
          .contains('View')
          .click()
        
        cy.get('@parentDiv')
          .contains('Like')
          .click()
        
        cy.get('@parentDiv')
          .should('contain', 'likes 1')
      })
      it('User who create the blog can delete it', function() {
        cy.contains('second blog').contains('View').click()
        cy.get('.completeBlog').contains('second blog').parent().contains('Remove').click()
  
        cy.get('html').should('not.contain', 'second blog Hermione Granger')
      })
      describe('create a second user', function() {
        beforeEach(function() {
          const user = {
            username: 'Ron',
            name: 'Ron Weasley',
            password: 'password'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)
          cy.visit('http://localhost:3000')

          //Logout current user
          cy.contains('Logout').click()

          //Sign in new user
          cy.login({ username: 'Ron', password: 'password'})
        })
        it('Blog cannot be deleted by other user', function() {
          cy.contains('second blog').contains('View').click()
          cy.get('.completeBlog').contains('second blog').parent().contains('Remove').click()

          cy.get('html').should('contain', 'second blog Hermione Granger')
          cy.get('.notification')
          .should('contain', 'deletion of blog not authorized')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
      })
      it('blogs are ordered according to likes', function() {
        cy.contains('first blog').contains('View').click()
        cy.get('.completeBlog').contains('first blog').parent().contains('Like').as('like_1')

        cy.contains('second blog').contains('View').click()
        cy.get('.completeBlog').contains('second blog').parent().contains('Like').as('like_2')

        cy.get('@like_2').click()
        cy.contains(`You liked: second blog by Hermione Granger!`)

        cy.get('@like_1').click()
        cy.contains(`You liked: first blog by Severus Snape!`)

        cy.get('@like_2').click()
        cy.contains(`You liked: second blog by Hermione Granger!`)

        cy.get('.blog').then((blogs) => {
          expect(blogs.eq(0)).to.contain('second blog')
          expect(blogs.eq(1)).to.contain('first blog')
        })

      })
    })  
  })
})
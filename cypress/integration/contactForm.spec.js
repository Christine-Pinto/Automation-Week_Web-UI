/* Beginner Challenge
Create an automated test that completes the contact us form on the homepage, submits it, and asserts that the form was completed successfully.
*/

describe('/contactForm', () => {
  beforeEach(() => {
    cy.visit('/')
    //Check if logo is visible to ensure the website is loaded
    cy.get('img.hotel-logoUrl')
      .should('be.visible')
  })

  it('Check contactForm fields', () => {
    //Variables to check if fields contain the correct value after typeing
    let name = cy.faker.name.findName()
    let email = cy.faker.internet.email()
    let phone = cy.faker.phone.phoneNumber()
    let subject = 'CypressTest '+ cy.faker.lorem.word()
    let description = cy.faker.lorem.text()

    cy.get('input#name')
      .should('be.visible')
      .type(name)
      .should('have.value', name)
    cy.get('input#email')
      .should('be.visible')
      .type(email)
      .should('have.value', email)
    cy.get('input#phone')
      .should('be.visible')
      .type(phone)
      .should('have.value', phone)
    cy.get('input#subject')
      .should('be.visible')
      .type(subject)
      .should('have.value', subject)
    cy.get('textarea#description')
      .should('be.visible')
      .type(description)
      .should('have.value', description)
    cy.get('button#submitContact')
      .should('be.visible')
  })

  it('Submit a contact request', () => {
    //Save name and subject in variables to check in the end if submit of the contact form was successfull and response message contains these the name and subject
    let name = cy.faker.name.findName()
    let subject = 'CypressTest '+ cy.faker.lorem.word()

    //Fill in the contact form input fields with generated fake Data by faker.js
    cy.get('input#name')
      .should('be.visible')
      .type(name)
    cy.get('input#email')
      .type(cy.faker.internet.email())
    cy.get('input#phone')
      .type(cy.faker.phone.phoneNumber())
    cy.get('input#subject')
      .type(subject)
    cy.get('textarea#description')
      .type(cy.faker.lorem.text())

    //Click on the 'submit' button
    cy.get('button#submitContact')
      .click()
    
    //Check if response message contains name and subject from the contact form
    cy.contains('h2', name)
    cy.contains('p', subject)
  })

})
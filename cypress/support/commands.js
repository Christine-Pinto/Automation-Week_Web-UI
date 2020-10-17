Cypress.Commands.add("sendMessage", (name, subject,email) => { 
  //Fill in the contact form input fields with generated fake Data by faker.js and the parameters
  cy.get('input#name')
    .should('be.visible')
    .type(name)
  cy.get('input#email')
    .type(email)
  cy.get('input#phone')
    .type(cy.faker.phone.phoneNumber())
  cy.get('input#subject')
    .type(subject)
  cy.get('textarea#description')
    .type(cy.faker.lorem.lines())

  //Click on the 'submit' button
  cy.get('button#submitContact')
    .click()
  
  //Check if response message contains name and subject from the contact form
  cy.contains('h2', name)
  cy.contains('p', subject)
 })


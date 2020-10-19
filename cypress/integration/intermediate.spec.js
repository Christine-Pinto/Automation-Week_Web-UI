/* Intermediate Challenge
Create an automated test that reads a message on the admin side of the site.

You’ll need to trigger a message in the first place, login as admin, open that specific message and validate its contents.
*/

describe('Intermediate Challenge', () => {
  beforeEach(() => {
    cy.visit('/')
    //Check if logo is visible to ensure the website is loaded
    cy.get('img.hotel-logoUrl')
      .should('be.visible')
  })

  it('Send a message and Check whether it was received correctly in the backend', () => {
    //Variables for the message which will be send via the contact form
    let name = cy.faker.name.findName()
    let subject = 'CypressTest '+ cy.faker.lorem.word()
    let email = cy.faker.internet.email()

    //send a message via the contact form
    cy.sendMessage(name, subject, email)

    //Login into the admin panel
    cy.adminLogin('admin','password')
   
    //Open Messages
    cy.get('i.fa-inbox')
      .click()
    cy.get('div.messages')
      .should('be.visible')
    
      //Open the message we send before via the contact form --> Identifier is the name and subject of the message
    cy.get('div.detail').contains(name)
      //we found the right row with the name and now check if this row also contains the right subject
      .parents('div.detail')
      .contains(subject)
      .click()
    
      //Check if name, subject and email address are correct in the message detail popUp
    cy.get('div.message-modal').as('popUpMessage')
      .contains(name)
    cy.get('@popUpMessage').contains(email)
    cy.get('@popUpMessage').contains(subject) 
  })
})
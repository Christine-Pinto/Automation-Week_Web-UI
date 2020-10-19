/* Advanced Challenge
Create an automated test where a user successfully books a room from the homepage.

You’ll have to click ‘Book this Room’, drag over dates you wish to book, complete the required information and submit the booking.
*/

describe('Advanced Challenge', () => {
  beforeEach(() => {
    cy.visit('/')
    //Check if logo is visible to ensure the website is loaded
    cy.get('img.hotel-logoUrl')
      .should('be.visible')
  })

  //This check wasn't required for the challenge, but I wanted to check the form first and make sure all the fields are working before submitting a message using this form
  it('Book a room', () => { 
    //Click on the 'Book this room' button
    cy.get('button').contains('Book this room')
      .click()
    //click into the next month
    cy.get('.rbc-btn-group').children().last()
      .click()
    
    //ToDo: Make selection of dates randomized
    cy.get('div.rbc-row-content').eq(0).children().children('.rbc-date-cell').eq(0)
      .click()
      .trigger("mousedown", { which: 1, pageX: 0, pageY: 0 });
  
    cy.get('div.rbc-row-content').eq(1).children().children('.rbc-date-cell').eq(1)
      .trigger("mousemove", 50, 0)
      .trigger("mouseup" ); 
  })
})
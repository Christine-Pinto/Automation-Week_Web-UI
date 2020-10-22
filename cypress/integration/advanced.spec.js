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
    let firstName = cy.faker.name.firstName()
    let lastName = cy.faker.name.lastName()
    let email = cy.faker.internet.email()
    let check = 1;

    //Click on the 'Book this room' button
    cy.get('button').contains('Book this room')
      .click()
    //click into the next month
    let max = Math.round(Math.random() * (12 - 1))

    cy.get('.rbc-btn-group').children().last()
      .click()


    /// Check if there are dates unavailable in this month
    cy.get('.rbc-row-content').find( 'div.rbc-event-content' ).its('length').then(res=>{
      //if so than go into the next month
      if(res > 0){
          //// do task that you want to perform
          cy.get('.rbc-btn-group').children().last()
            .click()
            .wait(200);
      }else{
        check = 0;
      }
      });




    
    //ToDo: Make selection of dates randomized
    cy.get('div.rbc-row-content').eq(0).children().children('.rbc-date-cell').eq(0)
      .click()
      .trigger("mousedown", { which: 1, pageX: 0, pageY: 0 });
  
    cy.get('div.rbc-row-content').eq(1).children().children('.rbc-date-cell').eq(1)
      .trigger("mousemove", 50, 0)
      .trigger("mouseup" ); 
 
    //Fill out the form
    cy.get('input.room-firstname')
      .type(firstName)
    cy.get('input.room-lastname')
      .type(lastName)
    cy.get('input.room-email')
      .type(email)
    cy.get('input.room-phone')
      .type(cy.faker.phone.phoneNumber())

    //Click on the 'Book' button to send the booking request
    cy.get('button.book-room').contains('Book')
      .click()

      cy.get('div.confirmation-modal')
        .should('be.visible')
        .contains('Booking Successful!')
       
  })
})
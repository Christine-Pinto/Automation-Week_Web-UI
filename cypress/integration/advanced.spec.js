/* Advanced Challenge
Create an automated test where a user successfully books a room from the homepage.

You’ll have to click ‘Book this Room’, drag over dates you wish to book, complete the required information and submit the booking.
*/

describe('Advanced Challenge', () => {
  beforeEach(() => {
    cy.visit('/')
    // Check if logo is visible to ensure the website is loaded
    cy.get('img.hotel-logoUrl')
      .should('be.visible')
  })

  it('Book a room', () => { 
    let firstName = cy.faker.name.firstName()
    let lastName = cy.faker.name.lastName()
    let email = cy.faker.internet.email()

    // Click on the 'Book this room' button
    cy.get('button').contains('Book this room')
      .click()

    // Click the 'next' button to switch the next month in the calendar
    cy.get('.rbc-btn-group').children().last()
      .click()
      .wait(500); // ToDo: Find a better way to check or wait here 

    // Conditional testing with Cypress is not as easy as it should be see here: https://docs.cypress.io/guides/core-concepts/conditional-testing.html
    // As we do not reset the database for every test, there may be no room available for the period shown --> In this case the test clicks 'next' to go to the next month
    // Loop is checking for a maxinmum of 14 month in to the future to book a room
    for (var i = 1; i < 15; i++) {
      cy.get("body").then($body => {
        if ($body.find("div.rbc-event-content").length > 0) { // There are some dates not available for the room
          cy.get('.rbc-btn-group').children().last()
          .click()
          .wait(800); // Need to wait for the 'unaviable'-label to appear --> ToDo: Find a better way to wait for an element that might not be there
        }
        else {
          i = 15; // Set the counter to 15 to continue the test as there are dates available
        }
      })
    }

    // ToDo: Make selection of dates randomized
    // Dates have to be selected via dragging the mouse from the start to the enddate --> mousedown, mousemove, mouseup
    cy.get('div.rbc-row-content').eq(0).children().children('.rbc-date-cell').eq(0)
      .click()
      .trigger("mousedown", { which: 1, pageX: 0, pageY: 0 });
  
    cy.get('div.rbc-row-content').eq(1).children().children('.rbc-date-cell').eq(1)
      .trigger("mousemove", 50, 0)
      .trigger("mouseup" ); 
 
    // Fill out the form
    cy.get('input.room-firstname')
      .type(firstName)
    cy.get('input.room-lastname')
      .type(lastName)
    cy.get('input.room-email')
      .type(email)
    cy.get('input.room-phone')
      .type(cy.faker.phone.phoneNumber())

    // Click on the 'Book' button to send the booking request
    cy.get('button.book-room').contains('Book')
      .click()

    // Check if confirmation popUp is shown.
    cy.get('div.confirmation-modal')
      .should('be.visible')
      .contains('Booking Successful!')
  })
})
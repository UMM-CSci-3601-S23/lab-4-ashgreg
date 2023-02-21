export class TodoListPage {
  navigateTo() {
    return cy.visit('/todos');
  }

  /**
   * Gets the title of the app when visiting the `/todos` page.
   *
   * @returns the value of the element with the ID `.todo-list-title`
   */
  getTodoTitle() {
    return cy.get('.todo-list-title');
  }

  /**
   * Get all the `app-todo-card` DOM elements. This will be
   * empty if we're using the list view of the users.
   *
   * @returns an iterable (`Cypress.Chainable`) containing all
   *   the `app-user-card` DOM elements.
   */
   getTodoCards() {
    return cy.get('.todo-cards-container app-todo-card');
  }
}

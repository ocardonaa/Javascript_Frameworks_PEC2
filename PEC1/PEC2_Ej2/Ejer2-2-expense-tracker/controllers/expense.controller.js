/**
 * @class Controller
 *
 * @param model
 * @param view
 */

class ExpenseController {
    constructor(service, view) {
        this.service = service;
        this.view = view;

        this.service.bindExpensesListChanged(this.onExpenseListChanged);
        this.view.bindAddExpense(this.handleAddExpense);
        this.view.bindDeleteExpense(this.handleDeleteExpense);

        this.onExpenseListChanged(this.service.expenses);
    }

    onExpenseListChanged = expenses => {
        this.view.displayExpenses(expenses);
    }

    handleAddExpense = (text, amount) => {
        this.service.addExpense(text, amount);
    }

    handleDeleteExpense = id => {
        this.service.deleteExpense(id);
    }
}
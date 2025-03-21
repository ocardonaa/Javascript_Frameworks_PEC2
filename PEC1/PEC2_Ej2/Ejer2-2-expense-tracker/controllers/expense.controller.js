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
        this.view.bindEditExpense(this.handleEditExpense);

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

    handleEditExpense = (id, newText) => {
        this.service.editExpense(id, newText);
    }
}

// en este caso controller no cambia tanto respecto al TODO, como mucho no poniendo métodos que no usaremos
/**
 * @class Service
 */

class ExpenseService {
    constructor() {
        this.expenses = (JSON.parse(localStorage.getItem('expenses')) || []).map(
            expense => new Expense(expense));
    }

    bindExpensesListChanged(callback) {
        this.onExpensesListChanged = callback;
      }

    _commit(expenses) {
        this.onExpensesListChanged(expenses);
        localStorage.setItem("expenses", JSON.stringify(expenses));
      }

    addExpense(text, amount) {
        this.expenses.push(new Expense({ text, amount }));
        this._commit(this.expenses);
    }

    deleteExpense(_id) {
        this.expenses = this.expenses.filter(({ id }) => id !== _id);
        this._commit(this.expenses);
    }
}
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

    editExpense(id, newText, newMoney) {
        this.expenses.forEach(expense => {
            if (expense.id === id) {
                expense.text = newText;
                expense.amount = newMoney;
            }
        });
        this._commit(this.expenses);
    }
}

/* 

en nuestro caso comparado con el TODO cambia ya que
- ahora construiremos con 2 elementos, el nombre de la expense y la cantidad (text, amount)
- no tenemos el toggle de si la el TODO está hecho o no
- el edit lo cambié ligeramente, de modo que ahora busca el gasto con mismo id y cambia el texto

*/
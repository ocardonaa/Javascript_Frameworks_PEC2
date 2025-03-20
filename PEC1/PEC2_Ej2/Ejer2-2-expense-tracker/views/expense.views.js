/**
 * @class View
 */

class ExpenseView {
    constructor() {
        this.title = this.createElement("h2");
        this.title.textContent = 'Expense Tracker';
        this.container = this.createElement('container');

        this.balance = this.createElement("h1");
        this.balance.textContent = '$0.00';
        this.balance_title = this.createElement('h4');
        this.balance_title.textContent = 'YOUR BALANCE';
        this.balance.textContent = 'YOUR BALANCE';
        this.inc_container = this.createElement('inc-exp-container');
        this.income = this.createElement('h4');
        this.expense = this.createElement('h4');
        this.money_income = this.createElement('p', 'money-plus');
        this.money_income.textContent = '$0.00';
        this.money_expense = this.createElement('p', 'money-minus');
        this.money_expense.textContent = '$0.00';
        this.history = this.createElement('h3');
        this.expensesList = this.createElement('ul', 'list');
        this.inc_container.append(this.income, this.money_income, this.expense, this.money_expense);

        this.new_transaction = this.createElement('h3');
        this.new_transaction.textContent = 'Add new transaction';

        this.form = this.createElement('form');
        this.input1 = this.createElement('input');
        this.label1 = this.createElement('label');
        this.input1.placeholder = 'Enter text...';
        this.label1.textContent = 'Text';
        this.input1.type = 'text';
        this.input2 = this.createElement('input');
        this.label2 = this.createElement('label');
        this.input2.placeholder = 'Enter amount...';
        this.label2.textContent = 'Amount';
        this.input2.type = 'number';
        this.transactionButton = this.createElement('button', 'btn');
        this.transactionButton.textContent = 'Add transaction';
        this.form.append(this.label1, this.input1, this.label2, this.input2, this.transactionButton);

        this.container.append(this.balance_title, this.balance, this.inc_container, this.history, this.expensesList, this.new_transaction, this.form);

        document.body.append(this.title, this.container);

    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if(className) {
            element.classList.add(className);
        }
        return element;
    }

    _resetInput() {
        this.input1.value = "";
        this.input2.value = "";
    }

    bindAddExpense(handler) {
        this.form,addEventListener('submit', event => {
            event.preventDefault();
            if(this.input1.value && this.input2.value) {
                handler(this.input1.value, this.input2.value);
                this._resetInput();
            }
        })
    }

    bindDeleteExpense(handler) {
        this.expensesList.addEventListener('click', event => {
            if(event.target.className === 'delete-btn') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        })
    }

    displayExpenses(expenses) {
        if(expenses.length !== 0) {
            expenses.forEach(expense => {
                const li = (expense.value > 0) ? document.createElement('li', 'plus') : document.createElement('li', 'minus');
                li.id = expense.id;
                const deleteBtn = this.createElement('button', 'delete-btn');
                deleteBtn.textContent = 'X';
                li.append(deleteBtn);
            });
        }
    }
}
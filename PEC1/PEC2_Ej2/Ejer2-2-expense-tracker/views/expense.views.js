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
        this.balance.textContent = '$0.00';
        this.history = this.createElement('h3');
        this.history.textContent = 'History'
        this.expensesList = this.createElement('ul', 'list');

        this.inc_container = this.createElement('div', 'inc-exp-container');
        this.inner_inc_income = this.createElement('div')
        this.inner_inc_expense = this.createElement('div');
        this.income = this.createElement('h4');
        this.income.textContent = 'INCOME';
        this.expense = this.createElement('h4');
        this.expense.textContent = 'EXPENSE';
        this.money_income = this.createElement('p', 'money');
        this.money_income.textContent = '$0.00';
        this.money_income.classList.add('plus')
        this.money_expense = this.createElement('p', 'money');
        this.money_expense.textContent = '$0.00';
        this.money_expense.classList.add('minus')

        this.inner_inc_income.append(this.income, this.money_income);
        this.inner_inc_expense.append(this.expense, this.money_expense);
        this.inc_container.append(this.inner_inc_income, this.inner_inc_expense);
        
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
        this.label2.innerHTML = 'Amount'+ '<br>' + '(negative-expense, positive-income)';
        this.input2.type = 'number';
        this.transactionButton = this.createElement('button', 'btn');
        this.transactionButton.textContent = 'Add transaction';
        this.form.append(this.label1, this.input1, this.label2, this.input2, this.transactionButton);

        this.container.append(this.balance_title, this.balance, this.inc_container, this.history, this.expensesList, this.new_transaction, this.form);

        document.body.append(this.title, this.container);

    }

    updateBalance(amount) {
        const total_money = parseFloat(this.balance.textContent.slice(1));
        const new_amount = parseFloat(amount);
        const new_total = parseFloat(total_money + new_amount).toFixed(2);
        this.balance.textContent = '$' + new_total.toString();
        if(new_amount > 0) {
            const positive_balance = parseFloat(this.money_income.textContent.slice(1));
            const new_positive = parseFloat(positive_balance + new_amount).toFixed(2);
            this.money_income.textContent = '$' + new_positive.toString();
        }
        else {
            const negative_balance = parseFloat(this.money_expense.textContent.slice(1));
            const new_negative = parseFloat(negative_balance + new_amount).toFixed(2);
            this.money_expense.textContent = '$' + new_negative.toString();
        }
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
                this.updateBalance(this.input2.value);
                this._resetInput();
            }
        });
        
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
        console.log(expenses);
    }
}
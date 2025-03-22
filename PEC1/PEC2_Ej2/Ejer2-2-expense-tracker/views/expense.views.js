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
        this.label2.innerHTML = 'Amount' + '<br>' + '(negative-expense, positive-income)';
        this.input2.type = 'number';
        this.transactionButton = this.createElement('button', 'btn');
        this.transactionButton.textContent = 'Add transaction';
        this.form.append(this.label1, this.input1, this.label2, this.input2, this.transactionButton);

        this.container.append(this.balance_title, this.balance, this.inc_container, this.history, this.expensesList, this.new_transaction, this.form);

        document.body.append(this.title, this.container);

        this._temporaryName = '';
        this._temporaryMoney = 0;
        this._initListener();

    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    _updateBalance(element, amount) {
        element.textContent = '$' + (amount.toFixed(2)).toString();
    }

    _resetInput() {
        this.input1.value = "";
        this.input2.value = "";
    }

    _initListener() {
        this.expensesList.addEventListener("input", event => {
            if (event.target.className === "plus" || event.target.className === "minus") {
                const firstLine = event.target.innerText.slice(0, event.target.innerText.indexOf('\n'));
                this._temporaryName = firstLine;
            }
            if (event.target.children[1].nodeName === "SPAN") {
                this._temporaryMoney = event.target.children[1].textContent;
            }
        });
    }

    bindAddExpense(handler) {
        this.form, addEventListener('submit', event => {
            event.preventDefault();
            if (this.input1.value && this.input2.value) {
                handler(this.input1.value, parseFloat(this.input2.value));
                this._resetInput();
            }
        });

    }

    bindDeleteExpense(handler) {
        this.expensesList.addEventListener('click', event => {
            if (event.target.className === 'delete-btn') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }

    bindEditExpense(handler) {
        this.expensesList.addEventListener('focusout', event => {
            if (this._temporaryName || this._temporaryMoney) {
                const fixedMoney = parseFloat(this._temporaryMoney);
                const id = event.target.id;
                handler(id, this._temporaryName, fixedMoney);
                this._temporaryName = "";
                this._temporaryMoney = 0;
            }
        });
    }

    displayExpenses(expenses) {
        while (this.expensesList.firstChild) {
            this.expensesList.removeChild(this.expensesList.firstChild);
        }
        let total_amount = 0;
        let positive_amount = 0;
        let negative_amount = 0;
        if (expenses.length !== 0) {
            expenses.forEach(expense => {
                const li = document.createElement('li');
                const aux_amount = parseFloat(expense.amount);
                total_amount += aux_amount;
                if (aux_amount > 0) {
                    li.classList.add('plus');
                    positive_amount += aux_amount;
                }
                else {
                    li.classList.add('minus');
                    negative_amount += aux_amount;
                }
                li.id = expense.id;
                li.contentEditable = true;
                li.textContent = expense.text;
                const deleteBtn = this.createElement('button', 'delete-btn');
                deleteBtn.innerHTML = 'X';
                li.append(deleteBtn);
                const spanMoney = document.createElement('span');
                spanMoney.style.color = (aux_amount > 0) ? '#2ecc71' : '#c0392b';
                spanMoney.textContent = aux_amount;
                spanMoney.contentEditable = true;
                li.append(spanMoney);
                this.expensesList.append(li);
                this._updateBalance(this.balance, total_amount);
                this._updateBalance(this.money_income, positive_amount);
                this._updateBalance(this.money_expense, negative_amount * -1);
            });
        }
        console.log(expenses);
    }
}

/*

En este caso hice muchos cambios y cosas
- Para empezar hice todo el html dinámicamente desde aqui, está en la parte del constructor.
  Este lo voy separando un poco con lineas en blanco para mayor visibilidad de cara a ver que títulos o elementos le corresponden a cada contenedor, ya sea el form, el inc-exp-container, el historial de gastos o todo el body
- Luego tengo el metodo de createElement para de forma más eficiente
- También he creado 4 metodos protegidos ya que no tiene sentido acceder a ellos desde fuera de la view, puesto que solo los necesitan los propios metodos de view, estos son:
  updateBalance: para reescribir cada uno de los balances con el signo del $
  resetInput: vacia el input del text y la cantidad del gasto
  initListener: usado para poder actualizar los textos de los gastos (apartado g del ejercicio)
  fixName: como el nombre que almacena temporaryName para cambiar el texto del gasto también contenia la X del boton y un salto de linea, esto lo arregla para poderse guardar correctamente, de modo que no todos los gastos terminan en \nX
- Tras esto tenemos todos los handlers de las views. Cada handler tiene un addEventListener que en función de lo que se haga (crear un nuevo gasto, eliminar-lo o editar-lo), se triggereará y enviará la información al controller y de ahi a la capa de servicio
- Por último displayExpenses, que muestra el listado de expenses que tenemos en el historial.
  Este gestiona el borrar o editar una expense, las actualizaciones del balance y el añadir los nuevos gastos

*/
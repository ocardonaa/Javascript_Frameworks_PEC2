/**
 * @class Model
 */

class Expense {

  constructor({ text, amount }) {
    this.id = this.uuidv4();
    this.text = text;
    this.amount = amount;
  }

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}

//en nuestro caso necesitamos id, texto del gasto y cantidad del gasto
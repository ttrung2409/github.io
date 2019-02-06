import context from './dbContext'

export default class Transaction {
  static begin() {
    let _this = new Transaction();
    return context.transaction().then(t => {
      _this._transaction = t;
      return _this;
    });
  }

  get value() {
    return this._transaction;
  }

  commit() {
    if (!!this._transaction) {
      this._transaction.commit();
    }
  }

  rollback() {
    if (!!this._transaction) {
      this._transaction.rollback();
    }
  }

}


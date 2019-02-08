import InvoiceRepository from '../repositories/invoiceRepository'
import PaymentRepository from '../repositories/paymentRepository'
import Transaction from '../transaction';

let invoiceRepository = new InvoiceRepository();
let paymentRepository = new PaymentRepository();

export default class InvoiceService {
  save(invoice) {
    let payment = !!invoice.payments && invoice.payments.length > 0 ? invoice.payments[0] : null;
    return Transaction.begin().then(t => {
      let promise = null;
      if (invoice.id > 0) {
        promise = invoiceRepository.updateWithItems(invoice.id, invoice, { transaction: t.value });
      }
      else {
        promise = invoiceRepository.create(invoice, { transaction: t.value });
      }

      return promise.then(invoice => {

        if (!payment) {
          return t.commit().then(() => invoice);
        }

        if (payment.id > 0) {
          return paymentRepository.update(payment, { id: payment.id }, { transaction: t.value }).then(() => {
            return t.commit().then(() => invoice);
          });
        }
        else {
          return t.commit().then(() => invoice);
        }
      }).then(invoice => this.getFull(invoice.id)).catch(err => {
        console.log(err);
        t.rollback();
        throw err;
      });            
    });
  }  

  getFull(id) {
    return invoiceRepository.getFull(id);
  }  

  lookup(query) {
    return invoiceRepository.lookup(query);
  }

  delete(id) {
    return invoiceRepository.delete(id);
  }  
}

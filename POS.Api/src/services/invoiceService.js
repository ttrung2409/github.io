import InvoiceRepository from '../repositories/invoiceRepository'
import PaymentRepository from '../repositories/paymentRepository'
import Transaction from '../transaction';

let invoiceRepository = new InvoiceRepository();
let paymentRepository = new PaymentRepository();

export default class InvoiceService {
  save(invoice) {    
    if (invoice.id > 0) {
      return invoiceRepository.updateAll(invoice.id, invoice).then(() => this.getFull(invoice.id));
    }
    else {
      return invoiceRepository.create(invoice);
    }
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

  pay(payment) {
    return Transaction.begin().then(t => {
      let promises = [];
      promises.push(invoiceRepository.update({
        status: 'Paid',
        customerId: payment.customerId
      }, { id: payment.invoiceId }, { transaction: t.value }));

      if (payment.id > 0) {
        promises.push(paymentRepository.update(payment, { id: payment.id }, { transaction: t.value }));
      }
      else {
        promises.push(paymentRepository.create(payment, { transaction: t.value }));
      }

      return Promise.all(promises)
        .then(() => t.commit())
        .catch(err => {
          console.log(err);
          t.rollback();
          throw err;
        });
    });    
  }
}

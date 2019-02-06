import InvoiceRepository from '../repositories/invoiceRepository'
import PaymentRepository from '../repositories/paymentRepository'

let invoiceRepository = new InvoiceRepository();
let paymentRepository = new PaymentRepository();

export default class InvoiceService {
  save(invoice) {    
    if (invoice.id > 0) {
      return invoiceRepository.update(invoice.id, invoice).then(() => this.get(invoice.id));
    }
    else {
      return invoiceRepository.create(invoice);
    }
  }  

  get(id) {
    return invoiceRepository.get(id);
  }  

  lookup(query) {
    return invoiceRepository.lookup(query);
  }

  delete(id) {
    return invoiceRepository.delete(id);
  }

  pay(payment) {    
    return paymentRepository.create(payment);
  }
}

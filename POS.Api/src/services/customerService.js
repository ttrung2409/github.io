import CustomerRepository from "../repositories/customerRepository";
import CustomerTypeRepository from "../repositories/customerTypeRepository";

let customerRepository = new CustomerRepository();
let customerTypeRepository = new CustomerTypeRepository();

export default class CustomerService {
  search(params) {
    return customerRepository.search(params);
  }

  lookup(query) {
    return customerRepository.lookup(query);
  }

  allTypes() {
    return customerTypeRepository.all();
  }

  get(id) {
    return customerRepository.get(id);
  }

  save(customer) {
    if (customer.id > 0) {
      return customerRepository.update(customer, { id: customer.id });
    }
    else {      
      return customerRepository.create(customer);
    }
  }

  delete(id) {
    return customerRepository.delete(id);
  }
}

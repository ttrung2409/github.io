import ProductRepository from '../repositories/productRepository'

let productRepository = new ProductRepository();

export default class ProductService {
  save(product) {
    if (product.id > 0) {
      return productRepository.update(product);
    }
    else {
      return productRepository.create(product);
    }
  }

  search(params) {
    return productRepository.search(params);
  }

  get(id) {
    return productRepository.get(id);
  }
}

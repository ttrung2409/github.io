import ProductRepository from '../repositories/productRepository'
import CategoryRepository from '../repositories/categoryRepository';
import UomRepository from '../repositories/uomRepository';

let productRepository = new ProductRepository();
let categoryRepository = new CategoryRepository();
let uomRepository = new UomRepository();

export default class ProductService {
  save(product) {
    if (product.id > 0) {
      return productRepository.update(product, { id: product.id });
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

  allCategories() {
    return categoryRepository.all();
  }

  allUoms() {
    return uomRepository.all();
  }

  lookup(query) {
    return productRepository.lookup(query);
  }

  delete(id) {
    return productRepository.delete(id);
  }
}

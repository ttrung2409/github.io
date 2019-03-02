import Category from './category'
import Customer from './customer'
import CustomerType from './customerType'
import Product from './product'
import Uom from './uom'
import Invoice from './invoice'
import InvoiceItem from './invoiceItem'
import Payment from './payment'
import User from './user'
import Permission from './permission'
import UserPermission from './userPermission'
import ProductSpec from './productSpec'

const models = {
  Category,
  Customer,
  CustomerType,
  Product,
  Uom,
  Invoice,
  InvoiceItem,
  Payment,
  User,
  Permission,
  UserPermission,
  ProductSpec
}

for (let key of Object.keys(models)) {
  if (!!models[key].associate) {
    models[key].associate(models);
  }
}

module.exports = models

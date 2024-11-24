// src/models/association.ts

import Customer from './customer';
import CustomerProduct from './customerProduct';
import DistributionItem from './distributionItem';
import DistributionItemProduct from './distributionItemProduct';
import FreezoneItem from './freezoneItem';
import FreezoneItemProduct from './freezoneItemProduct';
import Order from './order';
import OrderProduct from './orderProduct';
import Product from './product';

// Product <-> Customer (Many-to-Many)
Product.belongsToMany(Customer, {
  through: CustomerProduct,
  foreignKey: 'productId',
  as: 'customers',
});

Customer.belongsToMany(Product, {
  through: CustomerProduct,
  foreignKey: 'customerId',
  as: 'products',
});

// Customer <-> Order (One-to-Many)
Customer.hasMany(Order, {
  foreignKey: 'customerId',
  as: 'orders',
});

Order.belongsTo(Customer, {
  foreignKey: 'customerId',
  as: 'customer',
});

// Order <-> Product (Many-to-Many)
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'productId',
  as: 'orders',
});

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'orderId',
  as: 'products',
});

// Order <-> FreezoneItem (One-to-One)
Order.hasOne(FreezoneItem, {
  foreignKey: 'orderId',
  as: 'freezoneItem',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

FreezoneItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// FreezoneItem <-> Product (Many-to-Many)
FreezoneItem.belongsToMany(Product, {
  through: FreezoneItemProduct,
  foreignKey: 'freezoneItemId',
  otherKey: 'productId',
  as: 'products',
});

Product.belongsToMany(FreezoneItem, {
  through: FreezoneItemProduct,
  foreignKey: 'productId',
  otherKey: 'freezoneItemId',
  as: 'freezoneItems',
});

// FreezoneItem <-> DistributionItem (One-to-One)
FreezoneItem.hasOne(DistributionItem, {
  foreignKey: 'freezoneId',
  as: 'distributionItem',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

DistributionItem.belongsTo(FreezoneItem, {
  foreignKey: 'freezoneId',
  as: 'freezoneItem',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

// DistributionItem <-> Product (Many-to-Many)
DistributionItem.belongsToMany(Product, {
  through: DistributionItemProduct,
  foreignKey: 'distributionItemId',
  otherKey: 'productId',
  as: 'products',
});

Product.belongsToMany(DistributionItem, {
  through: DistributionItemProduct,
  foreignKey: 'productId',
  otherKey: 'distributionItemId',
  as: 'distributionItems',
});

export {
  Customer,
  CustomerProduct,
  DistributionItem,
  DistributionItemProduct,
  FreezoneItem,
  FreezoneItemProduct,
  Order,
  OrderProduct,
  Product,
};

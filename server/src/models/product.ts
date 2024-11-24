// src/models/Product.ts

import { sequelize } from '@/config/db';
import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Customer from './customer';
import DistributionItem from './distributionItem';
import DistributionItemProduct from './distributionItemProduct';
import FreezoneItem from './freezoneItem';
import FreezoneItemProduct from './freezoneItemProduct';
import Order from './order';
import OrderProduct from './orderProduct';

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product, { omit: 'id' }>> {
  declare id: number;
  declare title: string;
  declare productCode: string;
  declare shouldVAT: '0' | '1';
  declare prices: object;

  declare OrderProduct?: OrderProduct;
  declare FreezoneItemProduct?: FreezoneItemProduct;
  declare DistributionItemProduct?: DistributionItemProduct;

  // Static Associations
  public static associations: {
    customers: Association<Product, Customer>;
    orders: Association<Product, Order>;
    freezoneItems: Association<Product, FreezoneItem>;
    distributionItems: Association<Product, DistributionItem>;
    orderProducts: Association<Product, OrderProduct>;
    freezoneItemProducts: Association<Product, FreezoneItemProduct>;
    distributionItemProducts: Association<Product, DistributionItemProduct>;
  };

  // Association Mixins for Customers (Many-to-Many)
  declare getCustomers: BelongsToManyGetAssociationsMixin<Customer>;
  declare addCustomer: BelongsToManyAddAssociationMixin<Customer, number>;
  declare addCustomers: BelongsToManyAddAssociationsMixin<Customer, number>;
  declare setCustomers: BelongsToManySetAssociationsMixin<Customer, number>;
  declare removeCustomer: BelongsToManyRemoveAssociationMixin<Customer, number>;
  declare removeCustomers: BelongsToManyRemoveAssociationsMixin<Customer, number>;
  declare hasCustomer: BelongsToManyHasAssociationMixin<Customer, number>;
  declare hasCustomers: BelongsToManyHasAssociationsMixin<Customer, number>;

  // Association Mixins for Orders (Many-to-Many)
  declare getOrders: BelongsToManyGetAssociationsMixin<Order>;
  declare addOrder: BelongsToManyAddAssociationMixin<Order, number>;
  declare addOrders: BelongsToManyAddAssociationsMixin<Order, number>;
  declare setOrders: BelongsToManySetAssociationsMixin<Order, number>;
  declare removeOrder: BelongsToManyRemoveAssociationMixin<Order, number>;
  declare removeOrders: BelongsToManyRemoveAssociationsMixin<Order, number>;
  declare hasOrder: BelongsToManyHasAssociationMixin<Order, number>;
  declare hasOrders: BelongsToManyHasAssociationsMixin<Order, number>;

  // Association Mixins for FreezoneItems (Many-to-Many)
  declare getFreezoneItems: BelongsToManyGetAssociationsMixin<FreezoneItem>;
  declare addFreezoneItem: BelongsToManyAddAssociationMixin<FreezoneItem, number>;
  declare addFreezoneItems: BelongsToManyAddAssociationsMixin<FreezoneItem, number>;
  declare setFreezoneItems: BelongsToManySetAssociationsMixin<FreezoneItem, number>;
  declare removeFreezoneItem: BelongsToManyRemoveAssociationMixin<FreezoneItem, number>;
  declare removeFreezoneItems: BelongsToManyRemoveAssociationsMixin<FreezoneItem, number>;
  declare hasFreezoneItem: BelongsToManyHasAssociationMixin<FreezoneItem, number>;
  declare hasFreezoneItems: BelongsToManyHasAssociationsMixin<FreezoneItem, number>;

  // Association Mixins for DistributionItems (Many-to-Many)
  declare getDistributionItems: BelongsToManyGetAssociationsMixin<DistributionItem>;
  declare addDistributionItem: BelongsToManyAddAssociationMixin<DistributionItem, number>;
  declare addDistributionItems: BelongsToManyAddAssociationsMixin<DistributionItem, number>;
  declare setDistributionItems: BelongsToManySetAssociationsMixin<DistributionItem, number>;
  declare removeDistributionItem: BelongsToManyRemoveAssociationMixin<DistributionItem, number>;
  declare removeDistributionItems: BelongsToManyRemoveAssociationsMixin<DistributionItem, number>;
  declare hasDistributionItem: BelongsToManyHasAssociationMixin<DistributionItem, number>;
  declare hasDistributionItems: BelongsToManyHasAssociationsMixin<DistributionItem, number>;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shouldVAT: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
      defaultValue: '0',
    },
    prices: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        fields: ['id', 'productCode'],
        unique: true,
      },
    ],
  }
);

export default Product;

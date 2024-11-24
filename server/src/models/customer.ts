// src/models/Customer.ts

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
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import Order from './order';
import Product from './product';

export class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer, { omit: 'id' }>> {
  // Fields
  declare id: number;
  declare name: string;
  declare priceIndex: 'TR1' | 'TR2' | 'TR3' | 'TR4' | 'TR5' | 'TRD' | 'TRC';
  declare paymentOption: 'CASH' | 'TRANSFER' | 'CONSIGNMENT' | 'TRIAL' | 'DISCOUNTED';
  declare phone: string | null;
  declare email: string | null;
  declare needsInvoice: '0' | '1';

  // Static Associations
  public static associations: {
    products: Association<Customer, Product>;
    orders: Association<Customer, Order>;
  };

  // Association Mixins for Products (Many-to-Many)
  declare getProducts: BelongsToManyGetAssociationsMixin<Product>;
  declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
  declare addProducts: BelongsToManyAddAssociationsMixin<Product, number>;
  declare setProducts: BelongsToManySetAssociationsMixin<Product, number>;
  declare removeProduct: BelongsToManyRemoveAssociationMixin<Product, number>;
  declare removeProducts: BelongsToManyRemoveAssociationsMixin<Product, number>;
  declare hasProduct: BelongsToManyHasAssociationMixin<Product, number>;
  declare hasProducts: BelongsToManyHasAssociationsMixin<Product, number>;

  // Association Mixins for Orders (One-to-Many)
  declare getOrders: HasManyGetAssociationsMixin<Order>;
  declare addOrder: HasManyAddAssociationMixin<Order, number>;
  declare addOrders: HasManyAddAssociationsMixin<Order, number>;
  declare setOrders: HasManySetAssociationsMixin<Order, number>;
  declare removeOrder: HasManyRemoveAssociationMixin<Order, number>;
  declare removeOrders: HasManyRemoveAssociationsMixin<Order, number>;
  declare hasOrder: HasManyHasAssociationsMixin<Order, number>;
  declare hasOrders: HasManyHasAssociationsMixin<Order, number>;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceIndex: {
      type: DataTypes.ENUM('TR1', 'TR2', 'TR3', 'TR4', 'TR5', 'TRD', 'TRC'),
      allowNull: false,
    },
    paymentOption: {
      type: DataTypes.ENUM('CASH', 'TRANSFER', 'CONSIGNMENT', 'TRIAL', 'DISCOUNTED'),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    needsInvoice: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
      defaultValue: '0',
    },
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: false,
    indexes: [
      {
        fields: ['email'],
        unique: true,
      },
    ],
  }
);

export default Customer;

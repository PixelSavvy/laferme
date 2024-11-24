// src/models/Order.ts

import { sequelize } from '@/config/db';
import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  ForeignKey,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import Customer from './customer';
import DistributionItem from './distributionItem';
import FreezoneItem from './freezoneItem';
import Product from './product';

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order, { omit: 'id' }>> {
  // Fields
  declare id: number;
  declare customerId: ForeignKey<number>;
  declare status: 'TODELIVER' | 'DELIVERED' | 'RETURNED' | 'PREPARING' | 'PREPARED' | 'CANCELLED' | 'READYTODELIVER';

  // Associations
  declare customer?: Customer;
  declare products?: Product[];
  declare freezoneItem?: FreezoneItem;
  declare distributionItem?: DistributionItem;

  // Timestamps
  declare createdAt?: Date;
  declare updatedAt?: Date;

  // Static associations
  public static associations: {
    customer: Association<Order, Customer>;
    products: Association<Order, Product>;
    freezoneItem: Association<Order, FreezoneItem>;
    distributionItem: Association<Order, DistributionItem>;
  };

  // Association Mixins for Customer (BelongsTo)
  declare getCustomer: BelongsToGetAssociationMixin<Customer>;
  declare setCustomer: BelongsToSetAssociationMixin<Customer, number>;
  declare createCustomer: BelongsToCreateAssociationMixin<Customer>;

  // Association Mixins for Products (BelongsToMany)
  declare getProducts: BelongsToManyGetAssociationsMixin<Product>;
  declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
  declare addProducts: BelongsToManyAddAssociationsMixin<Product, number>;
  declare setProducts: BelongsToManySetAssociationsMixin<Product, number>;
  declare removeProduct: BelongsToManyRemoveAssociationMixin<Product, number>;
  declare removeProducts: BelongsToManyRemoveAssociationsMixin<Product, number>;
  declare hasProduct: BelongsToManyHasAssociationMixin<Product, number>;
  declare hasProducts: BelongsToManyHasAssociationsMixin<Product, number>;

  // Association Mixins for FreezoneItem (HasOne)
  declare getFreezoneItem: HasOneGetAssociationMixin<FreezoneItem>;
  declare setFreezoneItem: HasOneSetAssociationMixin<FreezoneItem, number>;
  declare createFreezoneItem: HasOneCreateAssociationMixin<FreezoneItem>;

  // Association Mixins for DistributionItem (HasOne)
  declare getDistributionItem: HasOneGetAssociationMixin<DistributionItem>;
  declare setDistributionItem: HasOneSetAssociationMixin<DistributionItem, number>;
  declare createDistributionItem: HasOneCreateAssociationMixin<DistributionItem>;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('TODELIVER', 'DELIVERED', 'RETURNED', 'PREPARING', 'PREPARED', 'CANCELLED', 'READYTODELIVER'),
      allowNull: false,
      defaultValue: 'PREPARING',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        fields: ['customerId'],
      },
      {
        fields: ['status'],
      },
    ],
  }
);

export default Order;

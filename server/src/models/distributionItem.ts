// src/models/DistributionItem.ts

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
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import Customer from './customer';
import FreezoneItem from './freezoneItem';
import Order from './order';
import Product from './product';

export class DistributionItem extends Model<
  InferAttributes<DistributionItem>,
  InferCreationAttributes<DistributionItem, { omit: 'id' }>
> {
  // Fields
  declare id: number;
  declare freezoneId: ForeignKey<number>;
  declare orderId: ForeignKey<number>;

  declare status: 'TODELIVER' | 'DELIVERED' | 'RETURNED' | 'PREPARING' | 'PREPARED' | 'CANCELLED' | 'READYTODELIVER';
  declare distributedAt?: Date;

  // Associations
  declare freezoneItem?: FreezoneItem;
  declare order?: Order;
  declare customer?: Customer;
  declare products?: Product[];

  declare createdAt?: Date;
  declare updatedAt?: Date;

  // Static Associations
  public static associations: {
    freezoneItem: Association<DistributionItem, FreezoneItem>;
    order: Association<DistributionItem, Order>;
    customer: Association<DistributionItem, Customer>;
    products: Association<DistributionItem, Product>;
  };

  // Association Mixins for FreezoneItem (BelongsTo)
  declare getFreezoneItem: BelongsToGetAssociationMixin<FreezoneItem>;
  declare setFreezoneItem: BelongsToSetAssociationMixin<FreezoneItem, number>;
  declare createFreezoneItem: BelongsToCreateAssociationMixin<FreezoneItem>;

  // Association Mixins for Order (BelongsTo)
  declare getOrder: BelongsToGetAssociationMixin<Order>;
  declare setOrder: BelongsToSetAssociationMixin<Order, number>;
  declare createOrder: BelongsToCreateAssociationMixin<Order>;

  // Association Mixins for Products (BelongsToMany)
  declare getProducts: BelongsToManyGetAssociationsMixin<Product>;
  declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
  declare addProducts: BelongsToManyAddAssociationsMixin<Product, number>;
  declare setProducts: BelongsToManySetAssociationsMixin<Product, number>;
  declare removeProduct: BelongsToManyRemoveAssociationMixin<Product, number>;
  declare removeProducts: BelongsToManyRemoveAssociationsMixin<Product, number>;
  declare hasProduct: BelongsToManyHasAssociationMixin<Product, number>;
  declare hasProducts: BelongsToManyHasAssociationsMixin<Product, number>;
}

DistributionItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    freezoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'freezoneItems',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },

    distributedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM('TODELIVER', 'DELIVERED', 'RETURNED', 'PREPARING', 'PREPARED', 'CANCELLED', 'READYTODELIVER'),
      allowNull: false,
      defaultValue: 'PREPARING',
    },
  },
  {
    sequelize,
    modelName: 'DistributionItem',
    tableName: 'distributionItems',
    timestamps: true,
    indexes: [
      {
        fields: ['status'],
      },
      {
        fields: ['freezoneId'],
      },
    ],
  }
);

export default DistributionItem;

// src/models/freezoneItem.ts

import { sequelize } from '@/config/db';
import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Customer from './customer';
import Order from './order';
import Product from './product';

export class FreezoneItem extends Model<
  InferAttributes<FreezoneItem>,
  InferCreationAttributes<FreezoneItem, { omit: 'id' }>
> {
  declare id: number;
  declare orderId: ForeignKey<number>;
  declare customerId: ForeignKey<number>;
  declare status: string;

  // Associations
  declare order?: Order;
  declare customer?: Customer;
  declare products?: Product[];

  declare createdAt?: Date;
  declare updatedAt?: Date;

  // Static Associations
  public static associations: {
    order: Association<FreezoneItem, Order>;
    customer: Association<FreezoneItem, Customer>;
    products: Association<FreezoneItem, Product>;
  };

  // Association Mixins
  declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
  declare addProducts: BelongsToManyAddAssociationsMixin<Product, number>;
  declare setProducts: BelongsToManySetAssociationsMixin<Product, number>;
}

FreezoneItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
      type: DataTypes.ENUM('PREPARING', 'PREPARED', 'TODELIVER', 'DELIVERED', 'RETURNED', 'CANCELLED', 'READYTODELIVER'),
      allowNull: false,
      defaultValue: 'PREPARING',
    },
  },
  {
    sequelize,
    modelName: 'FreezoneItem',
    tableName: 'freezoneItems',
    timestamps: true,
    indexes: [
      {
        fields: ['customerId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['orderId'],
      },
    ],
  }
);

export default FreezoneItem;

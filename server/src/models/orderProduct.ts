// src/models/OrderProduct.ts

import { sequelize } from '@/config/db';
import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Order from './order';
import Product from './product';

export class OrderProduct extends Model<InferAttributes<OrderProduct>, InferCreationAttributes<OrderProduct>> {
  // Foreign Keys
  declare orderId: ForeignKey<number>;
  declare productId: ForeignKey<number>;

  // Additional Fields
  declare price: number;
  declare quantity: number;
  declare weight: number;

  // Associations
  declare order?: Order;
  declare product?: Product;

  // Static Associations
  public static associations: {
    order: Association<OrderProduct, Order>;
    product: Association<OrderProduct, Product>;
  };

  // Association Mixins for Order
  declare getOrder: BelongsToGetAssociationMixin<Order>;
  declare setOrder: BelongsToSetAssociationMixin<Order, number>;

  // Association Mixins for Product
  declare getProduct: BelongsToGetAssociationMixin<Product>;
  declare setProduct: BelongsToSetAssociationMixin<Product, number>;
}

OrderProduct.init(
  {
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
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderProduct',
    tableName: 'orderProducts',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['orderId', 'productId'],
      },
    ],
  }
);

export default OrderProduct;

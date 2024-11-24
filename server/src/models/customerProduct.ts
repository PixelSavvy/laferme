// src/models/CustomerProduct.ts

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
import Customer from './customer';
import Product from './product';

export class CustomerProduct extends Model<InferAttributes<CustomerProduct>, InferCreationAttributes<CustomerProduct>> {
  // Foreign Keys
  declare customerId: ForeignKey<number>;
  declare productId: ForeignKey<number>;

  // Associations
  declare customer?: Customer;
  declare product?: Product;

  // Static Associations
  public static associations: {
    customer: Association<CustomerProduct, Customer>;
    product: Association<CustomerProduct, Product>;
  };

  // Association Mixins for Customer
  declare getCustomer: BelongsToGetAssociationMixin<Customer>;
  declare setCustomer: BelongsToSetAssociationMixin<Customer, number>;

  // Association Mixins for Product
  declare getProduct: BelongsToGetAssociationMixin<Product>;
  declare setProduct: BelongsToSetAssociationMixin<Product, number>;
}

CustomerProduct.init(
  {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: 'id',
      },
      onDelete: 'CASCADE', // Ensures referential integrity
      onUpdate: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
      onDelete: 'CASCADE', // Ensures referential integrity
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'CustomerProduct',
    tableName: 'customerProducts',
    timestamps: false, // No timestamps needed for pure join table
    indexes: [
      {
        unique: true,
        fields: ['customerId', 'productId'], // Composite unique key to prevent duplicate entries
      },
    ],
  }
);

export default CustomerProduct;

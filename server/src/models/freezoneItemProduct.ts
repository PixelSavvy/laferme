// src/models/FreezoneItemProduct.ts

import { sequelize } from '@/config/db';
import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import FreezoneItem from './freezoneItem';
import Product from './product';

export class FreezoneItemProduct extends Model<
  InferAttributes<FreezoneItemProduct>,
  InferCreationAttributes<FreezoneItemProduct>
> {
  // Foreign Keys
  declare freezoneId: ForeignKey<number>;
  declare productId: ForeignKey<number>;

  // Additional Fields
  declare weight: number;
  declare quantity: number;
  declare adjustedWeight: number;
  declare adjustedQuantity: number;

  // Associations
  declare freezoneItem?: FreezoneItem;
  declare product?: Product;

  // Static Associations
  public static associations: {
    freezoneItem: Association<FreezoneItemProduct, FreezoneItem>;
    product: Association<FreezoneItemProduct, Product>;
  };

  // Association Mixins for FreezoneItem (BelongsTo)
  declare getFreezoneItem: BelongsToGetAssociationMixin<FreezoneItem>;
  declare setFreezoneItem: BelongsToSetAssociationMixin<FreezoneItem, number>;
  declare createFreezoneItem: BelongsToCreateAssociationMixin<FreezoneItem>;

  // Association Mixins for Product (BelongsTo)
  declare getProduct: BelongsToGetAssociationMixin<Product>;
  declare setProduct: BelongsToSetAssociationMixin<Product, number>;
  declare createProduct: BelongsToCreateAssociationMixin<Product>;
}

FreezoneItemProduct.init(
  {
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
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    adjustedWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    adjustedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'FreezoneItemProduct',
    tableName: 'freezoneItemProducts',
    timestamps: false, // No timestamps needed for join tables
    indexes: [
      {
        unique: true,
        fields: ['freezoneId', 'productId'],
      },
    ],
  }
);

export default FreezoneItemProduct;

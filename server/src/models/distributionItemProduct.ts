// src/models/DistributionItemProduct.ts

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
import DistributionItem from './distributionItem';
import Product from './product';

export class DistributionItemProduct extends Model<
  InferAttributes<DistributionItemProduct>,
  InferCreationAttributes<DistributionItemProduct>
> {
  // Foreign Keys
  declare distributionItemId: ForeignKey<number>;
  declare productId: ForeignKey<number>;

  // Additional Fields
  declare adjustedWeight: number;
  declare distributedWeight: number;
  declare pricePerKilo: number;
  declare totalPrice: number;

  // Associations
  declare distributionItem?: DistributionItem;
  declare product?: Product;

  // Static Associations
  public static associations: {
    distributionItem: Association<DistributionItemProduct, DistributionItem>;
    product: Association<DistributionItemProduct, Product>;
  };

  // Association Mixins for DistributionItem (BelongsTo)
  declare getDistributionItem: BelongsToGetAssociationMixin<DistributionItem>;
  declare setDistributionItem: BelongsToSetAssociationMixin<DistributionItem, number>;
  declare createDistributionItem: BelongsToCreateAssociationMixin<DistributionItem>;

  // Association Mixins for Product (BelongsTo)
  declare getProduct: BelongsToGetAssociationMixin<Product>;
  declare setProduct: BelongsToSetAssociationMixin<Product, number>;
  declare createProduct: BelongsToCreateAssociationMixin<Product>;
}

DistributionItemProduct.init(
  {
    distributionItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'distributionItems',
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
    adjustedWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    distributedWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    pricePerKilo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'DistributionItemProduct',
    tableName: 'distributionItemProducts',
    timestamps: false, // No timestamps needed for join tables
    indexes: [
      {
        unique: true,
        fields: ['distributionItemId', 'productId'],
      },
    ],
  }
);

export default DistributionItemProduct;

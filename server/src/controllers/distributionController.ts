// src/controllers/distributionController.ts

import { sequelize } from '@/config/db';
import { Customer, DistributionItem, DistributionItemProduct, Product } from '@/models';
import { sendResponse } from '@/utils';
import { Request, Response } from 'express';

/**
 * Controller to retrieve all DistributionItems along with their associated Customers and Products.
 */
export const getAllDistributionItems = async (req: Request, res: Response) => {
  try {
    // Fetch DistributionItems with necessary associations
    const distributionItems = await DistributionItem.findAll({
      attributes: ['id', 'status', 'createdAt', 'distributedAt'],
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'paymentOption', 'needsInvoice'],
        },
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'title', 'productCode'],
          through: {
            as: 'DistributionItemProduct',
            attributes: ['pricePerKilo', 'distributedWeight', 'adjustedWeight', 'totalPrice', 'freezoneId', 'orderId'],
          },
        },
      ],
    });

    // If no items are found, return an empty array
    if (distributionItems.length === 0) {
      return sendResponse(res, 200, 'დისტრიბუციის ელემენტები ვერ მოიძებნა.', []);
    }

    // Transform the fetched data to the desired response format
    const transformedDistributionItems = distributionItems.map((distribution) => {
      const products =
        distribution.products?.map((product) => {
          const distributionProduct = product.DistributionItemProduct as DistributionItemProduct;

          return {
            id: product.id,
            title: product.title,
            productCode: product.productCode,
            pricePerKilo: distributionProduct?.pricePerKilo || 0,
            distributedWeight: distributionProduct?.distributedWeight || 0,
            adjustedWeight: distributionProduct?.adjustedWeight || 0,
            totalPrice: distributionProduct?.totalPrice || 0,
          };
        }) || [];

      const totalPrice = products.reduce((sum, product) => sum + product.totalPrice, 0);

      return {
        id: distribution.id,
        customer: distribution.customer,
        status: distribution.status,
        distributedAt: distribution.distributedAt,
        totalPrice,
        products,
        createdAt: distribution.createdAt?.toISOString(),
      };
    });

    // Return the transformed data
    return sendResponse(res, 200, 'დისტრიბუციის ელემენტები წარმატებით მიღებულია.', transformedDistributionItems);
  } catch (error) {
    console.error('Error fetching DistributionItems:', error);
    return sendResponse(res, 500, 'დისტრიბუციის ელემენტების მიღებისას მოხდა შეცდომა.');
  }
};

/**
 * Interface representing the structure of each product in the request body for updating a DistributionItem.
 */
interface UpdateDistributionProduct {
  id: number;
  pricePerKilo?: number;
  distributedWeight?: number;
  adjustedWeight?: number;
  totalPrice?: number;
  freezoneId?: number;
  orderId?: number;
}

/**
 * Controller to update a DistributionItem's product details, specifically fields within DistributionItemProduct.
 */
export const updateDistributionItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { products } = req.body;

  // Start a transaction to ensure atomicity
  const transaction = await sequelize.transaction();

  try {
    // 1. Validate DistributionItem existence
    const distributionItem = await DistributionItem.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          through: { as: 'DistributionItemProduct' },
        },
      ],
      transaction,
    });

    if (!distributionItem) {
      await transaction.rollback();
      return sendResponse(res, 404, 'დისტრიბუციის ჩანაწერი ვერ მოიძებნა.');
    }

    // 2. Validate the products array
    if (!Array.isArray(products) || products.length === 0) {
      await transaction.rollback();
      return sendResponse(res, 400, 'პროდუქტები არ არის მოწოდებული ან არასწორი ფორმატში.');
    }

    // 3. Extract product IDs from the request
    const productIds = products.map((product: UpdateDistributionProduct) => product.id);

    // 4. Fetch existing DistributionItemProduct associations
    const existingAssociations = await DistributionItemProduct.findAll({
      where: {
        distributionItemId: distributionItem.id,
        productId: productIds,
      },
      transaction,
    });

    // 5. Check if all provided products are associated with the DistributionItem
    if (existingAssociations.length !== productIds.length) {
      await transaction.rollback();
      return sendResponse(res, 400, 'ერთი ან მეტი პროდუქტი ამ დისტრიბუციის ელემენტთან არ არის დაკავშირებული.');
    }

    // 6. Iterate and update each DistributionItemProduct
    for (const product of products) {
      const association = existingAssociations.find((assoc) => assoc.productId === product.id);

      if (association) {
        // Update fields if they are provided in the request
        if (product.pricePerKilo !== undefined) {
          association.pricePerKilo = product.pricePerKilo;
        }
        if (product.distributedWeight !== undefined) {
          association.distributedWeight = product.distributedWeight;
        }
        if (product.adjustedWeight !== undefined) {
          association.adjustedWeight = product.adjustedWeight;
        }
        if (product.totalPrice !== undefined) {
          association.totalPrice = product.totalPrice;
        }

        await association.save({ transaction });
      }
    }

    // Optionally, update DistributionItem fields if needed (e.g., status, distributedAt)
    // Example:
    // const { status, distributedAt } = req.body;
    // if (status) distributionItem.status = status;
    // if (distributedAt) distributionItem.distributedAt = distributedAt;
    // await distributionItem.save({ transaction });

    // 7. Commit the transaction after successful updates
    await transaction.commit();

    return sendResponse(res, 200, 'დისტრიბუციის ელემენტი წარმატებით განახლდა.');
  } catch (error) {
    // Rollback the transaction in case of any errors
    if (transaction) await transaction.rollback();
    console.error('Error updating DistributionItem:', error);
    return sendResponse(res, 500, 'დისტრიბუციის განახლებისას მოხდა შეცდომა.');
  }
};

/**
 * Export the DistributionController with its respective handlers.
 */
export const distributionController = {
  getAllDistributionItems,
  updateDistributionItem,
};

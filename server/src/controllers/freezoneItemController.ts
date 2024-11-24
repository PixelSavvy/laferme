// src/controllers/freezoneItemController.ts

import { sequelize } from '@/config/db';
import { Customer, FreezoneItem, FreezoneItemProduct, Order, Product } from '@/models';
import { sendResponse } from '@/utils';
import { Request, Response } from 'express';

/**
 * Controller to retrieve all FreezoneItems along with their associated Orders, Customers, and Products.
 */
export const getAllFreezoneItems = async (req: Request, res: Response) => {
  try {
    // Fetch all FreezoneItems with necessary associations
    const freezoneItems = await FreezoneItem.findAll({
      attributes: ['id', 'status', 'createdAt'],
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'customerId'],
          include: [
            {
              model: Customer,
              as: 'customer',
              attributes: ['id', 'name', 'priceIndex', 'needsInvoice'],
            },
            {
              model: Product,
              as: 'products',
              attributes: ['id', 'title', 'productCode'],
              through: {
                as: 'OrderProduct',
                attributes: ['price', 'quantity', 'weight'],
              },
            },
          ],
        },
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'title', 'productCode'],
          through: {
            as: 'FreezoneItemProduct',
            attributes: ['weight', 'quantity', 'adjustedWeight', 'adjustedQuantity'],
          },
        },
      ],
    });

    if (freezoneItems.length === 0) {
      return sendResponse(res, 200, 'მონაცემები ვერ მოიძებნა', []);
    }

    // Transform the fetched data to the desired response format
    const transformedFreezoneItems = freezoneItems.map((freezone) => {
      const freezoneItemProducts = freezone.products?.map((product) => ({
        id: product.id,
        title: product.title,
        productCode: product.productCode,
        weight: (product.FreezoneItemProduct as FreezoneItemProduct)?.weight,
        quantity: (product.FreezoneItemProduct as FreezoneItemProduct)?.quantity,
        adjustedWeight: (product.FreezoneItemProduct as FreezoneItemProduct)?.adjustedWeight,
        adjustedQuantity: (product.FreezoneItemProduct as FreezoneItemProduct)?.adjustedQuantity,
      }));

      return {
        id: freezone.id,
        customer: freezone.order?.customer,
        orderId: freezone.order?.id,
        products: freezoneItemProducts,
        status: freezone.status,
        createdAt: freezone.createdAt,
      };
    });

    return sendResponse(res, 200, 'მონაცემები წარმატებით მიღებულია', transformedFreezoneItems);
  } catch (error) {
    console.error('Error fetching FreezoneItems:', error);
    return sendResponse(res, 500, 'Freezone ელემენტების მიღებისას მოხდა შეცდომა.');
  }
};

/**
 * Interface representing the structure of each product in the request body for updating a FreezoneItem.
 */
interface UpdateFreezoneProduct {
  id: number;
  adjustedWeight?: number;
  adjustedQuantity?: number;
}

/**
 * Controller to update a FreezoneItem's product details, specifically adjustedWeight and adjustedQuantity.
 */
export const updateFreezoneItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { products } = req.body;

  // Start a transaction to ensure atomicity
  const transaction = await sequelize.transaction();

  try {
    // Validate the FreezoneItem existence
    const freezoneItem = await FreezoneItem.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          through: { as: 'FreezoneItemProduct' },
        },
      ],
      transaction,
    });

    if (!freezoneItem) {
      await transaction.rollback();
      return res.status(404).json({ message: 'ფრიზონის ჩანაწერი ვერ მოიძებნა.' });
    }

    // Validate the products array
    if (!Array.isArray(products) || products.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'პროდუქტები არ არის მოწოდებული ან არასწორი ფორმატში.' });
    }

    // Extract product IDs from the request
    const productIds = products.map((product: UpdateFreezoneProduct) => product.id);

    // Fetch existing FreezoneItemProduct associations
    const existingAssociations = await FreezoneItemProduct.findAll({
      where: {
        freezoneId: freezoneItem.id,
        productId: productIds,
      },
      transaction,
    });

    // Check if all provided products are associated with the FreezoneItem
    if (existingAssociations.length !== productIds.length) {
      await transaction.rollback();
      return res.status(400).json({ message: 'ერთი ან მეტი პროდუქტი ამ ფრიზონთან არ არის დაკავშირებული.' });
    }

    // Iterate and update each FreezoneItemProduct
    for (const product of products) {
      const association = existingAssociations.find((assoc) => assoc.productId === product.id);

      if (association) {
        association.adjustedWeight = product.adjustedWeight ?? association.adjustedWeight;
        association.adjustedQuantity = product.adjustedQuantity ?? association.adjustedQuantity;

        await association.save({ transaction });
      }
    }

    // Commit the transaction after successful updates
    await transaction.commit();

    return res.status(200).json({
      message: 'ფრიზონის ჩანაწერი წარმატებით განახლდა.',
    });
  } catch (error) {
    // Rollback the transaction in case of any errors
    if (transaction) await transaction.rollback();
    console.error('Error updating FreezoneItem:', error);
    return res.status(500).json({ message: 'ფრიზონის განახლებისას მოხდა შეცდომა.' });
  }
};

/**
 * Export the FreezoneItemController with its respective handlers.
 */
export const freezoneItemController = {
  getAllFreezoneItems,
  updateFreezoneItem,
};

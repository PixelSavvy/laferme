import { sequelize } from '@/config/db';
import { DistributionItem, FreezoneItem } from '@/models';
import Customer from '@/models/customer';
import Order from '@/models/order';
import Product from '@/models/product';
import { sendResponse } from '@/utils';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

/**
 * Interface representing the structure of each product in the request body for adding an Order.
 */
interface ProductInput {
  id: number;
  productCode: string;
  title: string;
  price: number;
  weight: number;
  quantity: number;
}

/**
 * Interface representing the structure of the addOrder request body.
 */
interface AddOrderInput {
  customerId: number;
  products: ProductInput[];
  status: 'TODELIVER' | 'DELIVERED' | 'RETURNED' | 'PREPARING' | 'PREPARED' | 'CANCELLED' | 'READYTODELIVER';
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      attributes: {
        exclude: ['updatedAt'],
      },
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'title', 'productCode'],
          through: {
            attributes: ['price', 'quantity', 'weight'],
          },
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'priceIndex', 'needsInvoice'],
        },
      ],
    });

    if (orders.length === 0) {
      return sendResponse(res, 200, 'შეკვეთები ვერ მოიძებნა', []);
    }

    const transformedOrders = orders.map((order) => ({
      id: order.id,
      customer: order.customer,
      products: order.products?.map((product) => ({
        id: product.id,
        title: product.title,
        productCode: product.productCode,
        price: product.OrderProduct?.price,
        quantity: product.OrderProduct?.quantity,
        weight: product.OrderProduct?.weight,
      })),
      status: order.status,
      createdAt: order.createdAt,
    }));

    return sendResponse(res, 200, 'შეკვეთები წარმატებით მიღებულია', transformedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return sendResponse(res, 500, 'შეკვეთების მიღებისას მოხდა შეცდომა.');
  }
};

export const addOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const { customerId, products, status } = req.body as AddOrderInput;

    // 1. Validate Status
    const validStatuses = [
      'TODELIVER',
      'DELIVERED',
      'RETURNED',
      'PREPARING',
      'PREPARED',
      'CANCELLED',
      'READYTODELIVER',
    ] as const;

    if (!validStatuses.includes(status)) {
      await transaction.rollback();
      return sendResponse(res, 400, `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`, null);
    }

    // 2. Validate Customer
    const customer = await Customer.findByPk(customerId, { transaction });
    if (!customer) {
      await transaction.rollback();
      return sendResponse(res, 404, 'Customer not found.', null);
    }

    // 3. Validate Products Array
    if (!Array.isArray(products) || products.length === 0) {
      await transaction.rollback();
      return sendResponse(res, 400, 'Products array is required and cannot be empty.', null);
    }

    const productIds = products.map((product) => product.id);
    const foundProducts = await Product.findAll({
      where: { id: productIds },
      transaction,
    });

    if (foundProducts.length !== productIds.length) {
      await transaction.rollback();
      return sendResponse(res, 400, 'One or more products not found.', null);
    }

    // 4. Create Order
    const order = await Order.create(
      {
        customerId,
        status,
      },
      { transaction }
    );

    // 5. Associate Products with Order via OrderProduct
    for (const product of products) {
      await order.addProduct(product.id, {
        through: {
          price: product.price,
          quantity: product.quantity,
          weight: product.weight,
        },
        transaction,
      });
    }

    // 6. Create FreezoneItem
    const freezoneItem = await FreezoneItem.create(
      {
        orderId: order.id,
        customerId: customerId,
        status: status,
      },
      { transaction }
    );

    // Log freezoneItem.id to verify it's defined
    console.log(`FreezoneItem created with id: ${freezoneItem.id}`);
    if (!freezoneItem.id) {
      throw new Error('Failed to create FreezoneItem.');
    }

    // 7. Associate Products with FreezoneItem via FreezoneItemProduct
    for (const product of products) {
      await freezoneItem.addProduct(product.id, {
        through: {
          freezoneId: freezoneItem.id,
          quantity: product.quantity,
          weight: product.weight,
          adjustedQuantity: 0, // Initial value
          adjustedWeight: 0, // Initial value
        },
        transaction,
      });
    }

    // 8. Create DistributionItem
    const distributionItem = await DistributionItem.create(
      {
        freezoneId: freezoneItem.id,
        orderId: order.id,
        status: status,
      },
      { transaction }
    );

    // 9. Associate Products with DistributionItem via DistributionItemProduct
    for (const product of products) {
      const pricePerKilo = product.weight > 0 ? product.price / product.weight : 0;
      const totalPrice = pricePerKilo * product.weight;

      await distributionItem.addProduct(product.id, {
        through: {
          adjustedWeight: 0, // Initial value
          distributedWeight: 0, // Initial value
          pricePerKilo: pricePerKilo,
          totalPrice: totalPrice,
          freezoneId: freezoneItem.id,
          orderId: order.id,
        },
        transaction,
      });
    }

    // 10. Commit Transaction
    await transaction.commit();

    // 11. Fetch and Return the Created Order with Associations
    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'title', 'productCode'],
          through: { attributes: ['price', 'quantity', 'weight'] },
        },
        {
          model: FreezoneItem,
          as: 'freezoneItem',
          include: [
            {
              model: Product,
              as: 'products',
              attributes: ['id', 'title', 'productCode'],
              through: {
                attributes: ['quantity', 'weight', 'adjustedQuantity', 'adjustedWeight'],
              },
            },
          ],
        },
        {
          model: DistributionItem,
          as: 'distributionItem',
          include: [
            {
              model: Product,
              as: 'products',
              attributes: ['id', 'title', 'productCode'],
              through: {
                attributes: ['adjustedWeight', 'distributedWeight', 'pricePerKilo', 'totalPrice', 'freezoneId', 'orderId'],
              },
            },
          ],
        },
      ],
      transaction,
    });

    return sendResponse(res, 201, 'Order successfully created along with FreezoneItem and DistributionItem.', createdOrder);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error creating order:', error);

    // Handle Sequelize validation errors more gracefully
    if (error instanceof ValidationError) {
      return sendResponse(
        res,
        400,
        'Validation error.',
        error.errors.map((e) => e.message)
      );
    }

    return sendResponse(res, 500, 'An error occurred while creating the order.', null);
  }
};
const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = req.body;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: ['price', 'quantity', 'weight'] },
        },
      ],
    });

    if (!order) {
      return sendResponse(res, 200, 'შეკვეთა ვერ მოიძებნა.');
    }

    if (products && Array.isArray(products)) {
      const productIds = products.map((product: { id: number }) => product.id);
      const foundProducts = await Product.findAll({ where: { id: productIds } });

      if (foundProducts.length !== productIds.length) {
        return sendResponse(res, 200, 'ზოგიერთი პროდუქტი ვერ მოიძებნა.');
      }

      // Map products with additional data for the join table
      const orderProducts = products.map((product: any) => ({
        orderId: order.id,
        productId: product.id,
        price: product.price,
        quantity: product.quantity,
        weight: product.weight,
      }));

      // Update the join table directly
      const OrderProduct = sequelize.models.OrderProduct; // Make sure this model is defined
      await OrderProduct.bulkCreate(orderProducts, {
        updateOnDuplicate: ['price', 'quantity', 'weight'], // Fields to update
      });
    }

    return sendResponse(res, 200, 'შეკვეთა წარმატებით განახლდა.');
  } catch (error) {
    console.error('შეკვეთების განახლების შეცდომა:', error);
    return sendResponse(res, 500, 'შეკვეთების განახლებისას მოხდა შეცდომა.');
  }
};

export const orderController = {
  getAllOrders,

  addOrder,
  updateOrder,
};

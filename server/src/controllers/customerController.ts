import { Customer, Product } from '@/models';
import { sendResponse } from '@/utils';
import { Request, Response } from 'express';

const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll({
      include: {
        as: 'products',
        model: Product,
      },
    });

    if (customers.length === 0) {
      return sendResponse(res, 200, 'სარეალიზაციო პუნქტები ვერ მოიძებნა', []);
    }

    return sendResponse(res, 200, 'სარეალიზაციო პუნქტები წარმატებით მიღებულია', customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return sendResponse(res, 500, 'Failed to fetch customers.');
  }
};

const getCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByPk(id, {
      include: {
        as: 'products',
        model: Product,
      },
    });

    if (!customer) {
      return sendResponse(res, 404, 'მონიშნულ ID-ით მომხმარებელი ვერ მოიძებნა.');
    }

    return sendResponse(res, 200, 'მომხმარებელი წარმატებით მიღებულია.', customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return sendResponse(res, 500, 'Failed to fetch the customer.');
  }
};

const addCustomer = async (req: Request, res: Response) => {
  try {
    const { products, ...customerData } = req.body;

    if (
      !customerData.name ||
      !customerData.priceIndex ||
      !customerData.paymentOption ||
      !customerData.phone ||
      !customerData.email ||
      !customerData.needsInvoice
    ) {
      return sendResponse(res, 400, 'სახელი, ფასი ინდექსი, გადახდის ვარიანტი, ტელეფონი, მეილი და Invoice სავალდებულოა.');
    }

    const existingCustomer = await Customer.findOne({ where: { email: customerData.email } });

    if (existingCustomer) {
      return sendResponse(res, 409, 'მომხმარებელი მსგავსი მეილით უკვე არსებობს.');
    }

    const foundProducts = await Product.findAll({
      where: { id: products?.map((product: { id: number }) => product.id) || [] },
    });

    if (products && foundProducts.length !== products.length) {
      return sendResponse(res, 400, 'ზოგიერთი პროდუქტი ვერ მოიძებნა.');
    }

    const newCustomer = await Customer.create(customerData);

    if (foundProducts.length > 0) {
      await newCustomer.addProducts(foundProducts);
    }

    return sendResponse(res, 201, 'მომხმარებელი წარმატებით დაემატა!', newCustomer);
  } catch (error) {
    console.error('Error adding customer:', error);
    return sendResponse(res, 500, 'Failed to add the customer.');
  }
};

const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { products, ...customerData } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return sendResponse(res, 404, 'მომხმარებელი ვერ მოიძებნა.');
    }

    if (customerData.email && customerData.email !== customer.email) {
      const emailExists = await Customer.findOne({ where: { email: customerData.email } });
      if (emailExists) {
        return sendResponse(res, 409, 'მომხმარებლის ახალი მეილი უკვე არსებობს.');
      }
    }

    await customer.update(customerData);

    if (products && Array.isArray(products)) {
      const productIds = products.map((product) => product.id);
      const foundProducts = await Product.findAll({
        where: { id: productIds },
      });

      if (foundProducts.length !== products.length) {
        return sendResponse(res, 400, 'ზოგიერთი პროდუქტი ვერ მოიძებნა.');
      }

      await customer.setProducts(foundProducts);
    }

    return sendResponse(res, 200, 'მომხმარებელი წარმატებით შეიცვალა.', customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return sendResponse(res, 500, 'Failed to update the customer.');
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return sendResponse(res, 404, 'მომხმარებელი ვერ მოიძებნა.');
    }

    await customer.destroy();

    return sendResponse(res, 200, 'მომხმარებელი წარმატებით წაიშალა.');
  } catch (error) {
    console.error('Error deleting customer:', error);
    return sendResponse(res, 500, 'Failed to delete the customer.');
  }
};

export const customerController = {
  getAllCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};

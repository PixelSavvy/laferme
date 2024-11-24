import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Customer } from '@/services/customers/schema';
import { Order, OrderProduct } from '../schema';

type OrderStore = {
  order: Order | null;
  orders: Order[];
  setOrders: (data: Order[]) => void;
  setCustomer: (customer: Customer) => void;
  setProducts: (products: OrderProduct[]) => void;
};

export const useOrderStore = create<OrderStore>()(
  immer((set) => ({
    order: null,
    orders: [],

    setOrders: (data) =>
      set((state) => {
        state.orders = data;
      }),

    setCustomer: (customer) =>
      set((state) => {
        if (state.order) {
          state.order = {
            ...state.order,
            customerId: customer.id!,
          };
        }
      }),

    setProducts: (products) =>
      set((state) => {
        if (state.order) {
          state.order = {
            ...state.order,
            products: products.map((product) => ({
              ...product,
              price: product.price ?? 0,
              weight: product.weight ?? 0,
              quantity: product.quantity ?? 0,
            })),
          };
        }
      }),
  }))
);

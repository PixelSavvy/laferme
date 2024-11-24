import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Customer } from '../schema';

type CustomerStore = {
  customers: Customer[];
  setCustomers: (data: Customer[]) => void;
  getCustomer: (customerId: number) => Customer | undefined;
};

export const useCustomerStore = create<CustomerStore>()(
  immer((set, get) => ({
    customers: [],
    setCustomers: (data) =>
      set((state) => {
        state.customers = data;
      }),
    getCustomer: (customerId) => {
      return get().customers.find((customer) => customer.id === customerId);
    },
  }))
);

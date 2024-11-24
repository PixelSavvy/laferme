import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Product } from '../schema';

type ProductStore = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProduct: (productId: number) => Product | undefined;
};

export const useProductStore = create<ProductStore>()(
  immer((set, get) => ({
    products: [],
    setProducts: (products) =>
      set((state) => {
        state.products = products;
      }),
    getProduct: (productId) => get().products.find((product) => product.id === productId),
  }))
);

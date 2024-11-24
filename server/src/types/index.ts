export type OrderProductType = {
  id: number;
  price: number;
  weight: number;
  quantity: number;
};

export type AssociatedProductType = {
  id: number;
  title: string;
  productCode: string;
  createdAt: Date;
  updatedAt: Date;
  shouldVAT?: boolean;
  prices?: Record<string, number>;
  OrderProduct: OrderProductType[];
};

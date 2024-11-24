import { Order } from '@/services/orders/schema';
import { Row } from '@tanstack/react-table';

export const OrderCustomerCell = ({ row }: { row: Row<Order> }) => {
  const customer = row.original.customer;
  const products = row.original.products;

  return (
    <div className="flex justify-start items-center gap-1.5">
      {customer && <p>{customer.name}</p>}
      <div className="size-5 bg-info-500 text-background rounded-full flex justify-center items-center">
        <span className="typo-label-md font-semibold">{products.length}</span>
      </div>
    </div>
  );
};

import { AppTable } from '@/components/ui';
import { useProducts } from '../../api';
import { useProductColumns } from './product-columns';
import { ProductTableExpanded } from './product-table-expanded';

export const ProductTable = () => {
  const { columns } = useProductColumns();

  const { data: products } = useProducts({});

  if (!products?.data) return null;

  return (
    <AppTable
      columns={columns}
      data={products?.data}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <ProductTableExpanded row={row} />}
      fallback={products.message}
    />
  );
};

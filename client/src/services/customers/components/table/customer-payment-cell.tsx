import { Badge } from '@/components/ui';
import { Customer } from '../../schema';

export const CustomerPaymentCell = ({ paymentOption }: { paymentOption: Customer['paymentOption'] }) => {
  const paymentOptionStyles = {
    CASH: {
      text: 'ქეში',
      variant: 'CASH' as Customer['paymentOption'],
    },
    TRANSFER: {
      text: 'ტრანსფერი',
      variant: 'TRANSFER' as Customer['paymentOption'],
    },
    CONSIGNMENT: {
      text: 'კონსიგნაცია',
      variant: 'CONSIGNMENT' as Customer['paymentOption'],
    },
    TRIAL: {
      text: 'სატესტო',
      variant: 'TRIAL' as Customer['paymentOption'],
    },
    DISCOUNTED: {
      text: 'ფასდაკლებული',
      variant: 'DISCOUNTED' as Customer['paymentOption'],
    },
  } as const;

  const paymentInfo = paymentOptionStyles[paymentOption];

  if (!paymentInfo) {
    return null;
  }

  return (
    <div>
      <Badge variant={paymentInfo.variant}>{paymentInfo.text}</Badge>
    </div>
  );
};

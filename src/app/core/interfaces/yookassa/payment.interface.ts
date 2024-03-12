export interface CreatePaymentRequestInterface {
  uuid: string;
  value: string;
  commission: string;
  payment_type: string;
  return_url: string;
}

export interface CreatePaymentResponseInterface {
  uuid: string;
  value: string;
  commission: string;
  payment_type: string;
  return_url: string;
}

export interface PayoutRequestInterface {
  amount: PayoutAmountInterface;
  payout_destination_data: PayoutDestinationDataInterface;
  description: string;
  metadata: PayoutMetadataInterface;
}

export interface PayoutMetadataInterface{
  order_id: string;
}

export interface PayoutAmountInterface {
  value: string;
  currency: string;
}

export interface PayoutDestinationDataInterface {
  type: PayoutTypeInterface;
  card: PayoutCardInterface;
}

export interface PayoutCardInterface {
  number: string;
}

export interface PayoutTypeInterface {
  title: string
}

export interface RefundRequestInterface {
  payment_id: string;
  amount: RefundAmountInterface;
}

export interface RefundAmountInterface {
  value: string;
  currency: string;
}

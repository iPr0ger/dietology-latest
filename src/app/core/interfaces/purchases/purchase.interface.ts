export interface PurchaseDetailsResponseInterface {
  id: string;
  product_name: string;
  quantity: number;
  price_per_unit: string;
  total_price: string;
  created_at: string;
  updated_at: string;
  order: string;
}

export interface PurchaseDetailsRequestInterface {
  product_name: string;
  quantity: number;
  price_per_unit: string;
  total_price: string;
  order: string;
}

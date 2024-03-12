export interface OrderDetailsResponseInterface {
  id: string;
  order_type: string;
  order_date: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: string;
}

export interface OrderDetailsRequestInterface {
  order_type: string;
  order_date: string;
  description: string;
  status: string;
  user: string;
}

import {OrdersRequestInterface, OrdersResponseInterface} from "../orders/orders.interface";

export interface ServiceDetailsResponseInterface {
  id: string;
  order: OrdersResponseInterface,
  service_name: string;
  service_description: string;
  price: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceDetailsRequestInterface {
  service_name: string;
  service_description: string;
  price: string;
  order: OrdersRequestInterface
}

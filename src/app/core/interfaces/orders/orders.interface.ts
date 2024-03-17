import {UserRequestInterface, UserResponseInterface} from "../account/user.interface";

export interface OrdersRequestInterface {
  user: UserRequestInterface;
  order_type: string;
  order_date: string;
  description: string;
  status: string;
}

export interface OrdersResponseInterface {
  id: string;
  user: UserResponseInterface;
  order_type: string;
  order_date: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

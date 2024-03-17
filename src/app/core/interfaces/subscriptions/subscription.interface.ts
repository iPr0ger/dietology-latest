import {UserRequestInterface, UserResponseInterface} from "../account/user.interface";

export interface SubscriptionResponseInterface {
  id: string;
  owner_id: UserResponseInterface;
  subscription_name: string;
  subscription_type: string;
  start_date: string;
  end_date: string;
  description: string;
  price_month: string;
  price_year: string;
  status: string;
}


export interface SubscriptionRequestInterface {
  owner_id: UserRequestInterface;
  subscription_name: string;
  subscription_type: string;
  start_date: string;
  end_date: string;
  description: string;
  price_month: string;
  price_year: string;
  status: string;
}


export interface UserSubscriptionResponseInterface {
  id: string;
  user_id: UserResponseInterface;
  subscription_id: SubscriptionResponseInterface;
}

export interface UserSubscriptionRequestInterface {
  user_id: UserRequestInterface;
  subscription_id: SubscriptionRequestInterface;
}

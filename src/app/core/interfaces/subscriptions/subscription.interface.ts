export interface SubscriptionRequestInterface {
  owner_id: string;
  subscription_name: string;
  subscription_type: string;
  start_date: string;
  end_date: string;
  description: string;
  price_month: string;
  price_year: string;
  status: string;
}

export interface SubscriptionResponseInterface {
  id: string;
  owner_id: string;
  subscription_name: string;
  subscription_type: string;
  start_date: string;
  end_date: string;
  description: string;
  price_month: string;
  price_year: string;
  status: string;
}

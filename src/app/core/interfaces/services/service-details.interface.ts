export interface ServiceDetailsRequestInterface {
  service_name: string;
  service_description: string;
  price: string;
  order: string;
}

export interface ServiceDetailsResponseInterface {
  id: string;
  service_name: string;
  service_description: string;
  price: string;
  created_at: string;
  updated_at: string;
  order: string;
}

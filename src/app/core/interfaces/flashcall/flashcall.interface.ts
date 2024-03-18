export interface FlashCallRequestInterface {
  phone: string;
}

export interface FlashCallResponseInterface {
  phone: string;
  code: string;
}

export interface FlashCallTokenResponseInterface {
  user_id: string;
  refresh: string;
  access: string;
}


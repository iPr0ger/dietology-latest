export interface SignUpRequestInterface {
  email: string;
  password: string;
}

export interface SignUpResponseInterface {
  email: string;
  password: string;
}

export interface SignUpByPhoneRequestInterface {
  phone: string;
  code: string;
}

export interface SignUpByPhoneResponseInterface {
  phone: string;
  code: string;
}

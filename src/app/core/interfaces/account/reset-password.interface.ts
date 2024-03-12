export interface ResetPasswordRequestInterface {
  phone: string;
  password: string;
}

export interface ResetPasswordResponseInterface {
  phone: string;
  password: string;
}

export interface ResetPasswordEmailRequestInterface {
  email: string;
  password: string;
}

export interface ResetPasswordEmailResponseInterface {
  email: string;
  password: string;
}

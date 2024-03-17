export interface SignInRequestInterface {
  username: string;
  password: string;
}

export interface SignInCodeRequestInterface {
  username: string;
  password: string;
  verification_code: string;
}

export interface SignInResponseInterface {
  username: string;
  password: string;
}

export interface SignInCodeResponseInterface {
  username: string;
  password: string;
  verification_code: string;
}

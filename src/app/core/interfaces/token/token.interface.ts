export interface TokenResponseInterface {
  access: string;
  refresh: string;
}

export interface TokenVerifyRequestInterface {
  token: string;
}

export interface TokenRefreshRequestInterface {
  refresh: string;
}

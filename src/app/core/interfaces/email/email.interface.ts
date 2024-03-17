export interface SendCodeEmailRequestInterface {
  email: string;
}

export interface SendCodeEmailResponseInterface {
  email: string;
}

export interface VerifyEmailRequestInterface {
  email: string;
}

export interface VerifyEmailResponseInterface {
  email: string;
}

export interface SendEmailMessageRequestInterface {
  email: string;
  subject: string;
  message: string;
}

export interface SendEmailMessageResponseInterface {
  email: string;
  subject: string;
  message: string;
}

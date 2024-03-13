export interface UserResponseInterface {
  id: string;
  password: string | null;
  last_login: string | null;
  is_superuser: boolean | null;
  username: string | null;
  is_email_verified: boolean | null;
  is_specialist: boolean | null;
  is_patient: boolean | null;
  is_hr: boolean | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  is_staff: boolean | null;
  is_active: boolean | null;
}

export interface UserRequestInterface {
  password: string;
  last_login: string;
  is_superuser: boolean;
  username: string;
  is_email_verified: boolean;
  is_specialist: boolean;
  is_patient: boolean;
  is_hr: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_staff: boolean;
  is_active: boolean;
}

export interface MinimalUserResponseInterface {
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  username: string | null;
  id: string;
}

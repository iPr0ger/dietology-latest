export interface UserResponseInterface {
  id: string;
  password: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  is_specialist: boolean | null;
  is_patient: boolean | null;
}

export interface UserRequestInterface {
  password: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
}

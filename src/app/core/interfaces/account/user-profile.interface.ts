export interface UserProfileResponseInterface {
  id: string | null;
  photo: string | null;
  date_of_birth: string | null;
  gender: string | null;
  code: string | null;
  additional_info: string | null;
  user: string | null;
}

export interface UserProfileRequestInterface {
  date_of_birth: string;
  code: string;
  additional_info: string;
  user: string;
}

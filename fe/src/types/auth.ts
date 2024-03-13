export interface ISignupData<T = Date> {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  dob: T;
  longitude: number;
  latitude: number;
  image: File | '';
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  refresh: string;
  access: string;
}
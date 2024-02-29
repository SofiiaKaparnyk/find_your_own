export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  description: null | string;
  longitude: number;
  latitude: number;
  image: string;
}

export interface IUserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  gender: string;
  description: null | string;
  longitude: number;
  latitude: number;
  image: string;
}

export interface IBEError {
  code: number;
  error: string;
}

export interface IBackEndError {
  type: string;
  errors: {
    code: string;
    detail: string;
    attr: string;
  }[];
}

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

export default interface IUser {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
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
}

export interface ILoginData {
  email: string;
  password: string;
}
export default interface IUser {
    password: string,
    email: string,
    first_name: string,
    last_name: string
};

export interface IBEError {code: number, error: string};
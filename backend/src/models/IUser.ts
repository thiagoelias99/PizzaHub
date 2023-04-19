export interface IUser {
    uuid: string,
    name: string,
    password: string,
    email: string,
    signupDate: String | Date
    lastLogin: String | Date
}
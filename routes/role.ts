import { Request } from "express"
import { IUser } from "../models/user"
export interface IGetUser extends Request {
    user?:IUser;
  role?: string // or any other type
}
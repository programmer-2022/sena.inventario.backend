import { Document } from 'mongoose'

export interface User extends Document {
    _id? : string;
    readonly name : string;
    readonly pass : string;
    readonly rolID : string;
    readonly createdAt : Date;
}
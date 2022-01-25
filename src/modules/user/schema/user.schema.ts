import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    name : String,
    pass : String,
    rolID : String,
    createdAt : {
        type: Date,
        default: Date.now
    }
});
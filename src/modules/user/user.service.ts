import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel : Model<User>) {

    }

    async findAll() : Promise<User[]> {
        return await this.userModel.find()
    }

    async findOne(userID : string) : Promise<User> {
        return await this.userModel.findById(userID)
    }

    async create(userDTO : CreateUserDTO) : Promise<User> {
        const user = new this.userModel(userDTO)
        return await user.save()
    }

    async delete(userID : string) : Promise<User> {
        return await this.userModel.findByIdAndDelete(userID)
    }

    async update(userID : any, createUserDTO : CreateUserDTO) : Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            userID,
            createUserDTO,
            {new: true} //regreso el nuevo usuario actualizado no el anterior
        )
        return updatedUser
    }
}

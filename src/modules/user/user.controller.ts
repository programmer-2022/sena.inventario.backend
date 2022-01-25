import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Res, 
    HttpStatus, 
    Body, 
    Param,
    NotFoundException,
    Query    
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service'
import { isValidObjectId } from 'mongoose'

@Controller('user')
export class UserController {

    constructor(private userService : UserService){ }

    @Post('/create')
    async create(@Res() res, @Body() userDTO : CreateUserDTO) {

        try {
            const user = await this.userService.create(userDTO)
            if(user !== null) {
                res.status(HttpStatus.OK).json({
                    message: 'Usuario registrado con éxito'
                })
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: error
            })
        }        
    }

    @Get('/')
    async findAll(@Res() res) {
        try {
            const users = await this.userService.findAll()
            if(users !== null) {
                return res.status(HttpStatus.OK).json({
                    users
                })
            }
        } catch (error) {
            console.log(error); 
        }
    }

    @Get('/:id')
    async findOne(@Res() res, @Param('id') userID) {
        try {
            const user = await this.userService.findOne(userID)
            if(!user) return res.status(HttpStatus.NOT_FOUND)
            return res.status(HttpStatus.OK).json(user)
        } catch (error) {
            console.log(error)
        }
    }

    @Delete('/delete')
    async delete(@Res() res, @Query('id') userID) {
        try {
            const userDeleted = await this.userService.delete(userID)
            if(!userDeleted) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'El usuario no existe'
                })
            } else {
                return res.status(HttpStatus.OK).json({
                    message: 'Usuario eliminado con exito',
                    userDeleted
                })
            }
        } catch (error) {
            console.log(error)           
        }
    }

    @Put('/update')
    async update(@Res() res, @Body() createUserDTO : CreateUserDTO, @Query('id') userID) {
        try {
            if(isValidObjectId(userID)) {
                const userUpdated = await this.userService.update(userID, createUserDTO)
                                
                if(userUpdated) {
                    return res.status(HttpStatus.OK).json({
                        message: 'Usuario modificado con exito',
                        userUpdated
                    })
                }
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'El usuario no existe'
                })
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'El ID no es válido'
                })
            }
        } catch (error) {
            console.log(error)
        }          
    }
}
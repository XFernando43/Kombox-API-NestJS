import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/user.service';
import { UserRequest } from 'src/Authentication-Managment/Domain/request/user.request';

@Controller('User')
@ApiTags('User')
export class UserController {
    constructor(private accountService:UsersService){}
    @Get()
    getUser(){
        return this.accountService.listUsers();
    }
    @Post('crearUsuarioAccount')
    createUser(@Body() userRequest:UserRequest){
        return this.accountService.createUser(userRequest);
    }

}

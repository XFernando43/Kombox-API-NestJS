import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/user.service';

@Controller('User')
@ApiTags('User')
export class UserController {

    constructor(private accountService:UsersService){ }

    @Get()
    getUser(){
        return this.accountService.listUsers();
    }

    @Post()
    createUser(@Body() userRequest:any){
        return this.accountService.createUser(userRequest);
    }

}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from '../service/accounts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('Account')
export class AccountsController {

    constructor(private accountService:AccountsService){ }

    @Get()
    getUser(){
        return this.accountService.listUsers();
    }

    @Post()
    createUser(@Body() userRequest:any){
        return this.accountService.createUser(userRequest);
    }

}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../service/authentication.service';
import { AccountRequest } from 'src/Authentication-Managment/Domain/request/account.request';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {

    constructor(private authenticationService:AuthenticationService){}

    @Get()
    getAccount(){
        return this.authenticationService.getAccount();
    }

    @Post()
    postAccount(@Body() account:AccountRequest){
        return this.authenticationService.postAccount(account);
    }

}
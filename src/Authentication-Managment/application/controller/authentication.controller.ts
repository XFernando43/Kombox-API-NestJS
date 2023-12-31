import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../service/authentication.service';
import { AccounLogingRequest } from 'src/Authentication-Managment/Domain/request/AccounLoging.request';
import { Response,Request } from 'express';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
    constructor(
        private authenticationService:AuthenticationService,
        
        ){}
    @Get()
    getAccount(){
        return this.authenticationService.getAccount();
    }
    
    @Post('login')
    async Login(@Body() account:AccounLogingRequest,@Res({passthrough:true}) response:Response){
        try{
            const jwt = await this.authenticationService.Login(account);
            response.cookie('jwt',jwt,{httpOnly:true});
            return {
                message:'Success',
                token:jwt,    
            };
        }catch(error){
            throw new BadRequestException(error.message);
        }
    }

    @Get('user')
    user(@Req() request: Request) {
        return this.authenticationService.prueba(request);
      
    }

    @Post('logOut')
    async logOut(@Res({passthrough:true}) response:Response){
        return this.authenticationService.logOut(response);
    } 
    
    
}

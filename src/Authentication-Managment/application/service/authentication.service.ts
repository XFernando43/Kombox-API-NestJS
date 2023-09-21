import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/Authentication-Managment/Domain/entities/account.entity';
import { AccounLogingRequest } from 'src/Authentication-Managment/Domain/request/AccounLoging.request';
import { JwtService } from '@nestjs/jwt';
import { Response,Request } from 'express';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

@Injectable()
export class AuthenticationService {

    constructor(
                @InjectRepository(Account) private accountRepository:Repository<Account>,
                private jwtService:JwtService
                ){ }

   
    async getAccount(){
        return 'account new service maximun punch';
    }

    async Login(account: AccounLogingRequest){

        const user = this.accountRepository.findOne({
            where:{
                email:account.email
            }
        })
        if(!user){
            throw new BadRequestException('Invalid credentials');
        }

        if(!await bcrypt.compare(account.password, (await user).password)){
            throw new BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id:(await user).accountId});

        return jwt;
    }

    async prueba(request:Request){
        try{
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if(!data){
                return new UnauthorizedException();
            }

            const user = await this.accountRepository.findOne({
                where:{
                    accountId:data['id'],
                }
            })
            console.log(user);
            return user;
        }catch(error){
            return new UnauthorizedException();
        }

    }

    async logOut(response:Response){
        response.clearCookie('jwt');

        return {
            message:'success log out'
        }
    }
  
}

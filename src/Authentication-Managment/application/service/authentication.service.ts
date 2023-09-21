import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/Authentication-Managment/Domain/entities/account.entity';
import { AccounLogingRequest } from 'src/Authentication-Managment/Domain/request/AccounLoging.request';

@Injectable()
export class AuthenticationService {

    constructor(@InjectRepository(Account) private accountRepository:Repository<Account>){ }

   
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

        return user;
    }

    async postAccount(_account:any){
        const hashedPassword = await bcrypt.hash(_account.password,12);

        const account = new Account();

        account.email = _account.email;
        account.password = hashedPassword;

        this.accountRepository.create(account);
        return this.accountRepository.save(account);

    }
}

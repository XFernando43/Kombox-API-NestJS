import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/Authentication-Managment/Domain/entities/account.entity';

@Injectable()
export class AuthenticationService {

    constructor(@InjectRepository(Account) private accountRepository:Repository<Account>){ }

   
    async getAccount(){
        return 'ACCOUNT';
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

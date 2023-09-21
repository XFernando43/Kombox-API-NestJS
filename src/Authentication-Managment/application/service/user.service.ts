import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/Authentication-Managment/Domain/entities/account.entity';
import { User } from 'src/Authentication-Managment/Domain/entities/user.entity';
import { UserRequest } from 'src/Authentication-Managment/Domain/request/user.request';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { categoryRequest } from 'src/product-managment/Domain/request/categoryRequest';

@Injectable()
export class UsersService {
    constructor
    (@InjectRepository(User) private UserRepository:Repository<User>,
     @InjectRepository(Account) private AccountRepository:Repository<Account>
    ){}

    async listUsers(){
        return await this.UserRepository.find();
    }

    async createUser(_user: UserRequest) {
        try {
            const hashedPassword = await bcrypt.hash(_user.password,12);
            const newUser = this.UserRepository.create(_user);

            const newAccount = new Account();
            newAccount.email = _user.email;
            newAccount.password = hashedPassword;
            newAccount.user = newUser;
            
            await this.UserRepository.save(newUser);
            await this.AccountRepository.save(newAccount);        
            
            return newAccount;
        } catch (error) {
          return new HttpException('Conflict', HttpStatus.CONFLICT);
        }
      }
    
}

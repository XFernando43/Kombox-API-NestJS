import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Authentication-Managment/Domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private UserRepository:Repository<User>){}

    async listUsers(){
        return await this.UserRepository.find();
    }

    async createUser(user:any){
        await this.UserRepository.create(user);
        return await this.UserRepository.save(user);
    }
    
}

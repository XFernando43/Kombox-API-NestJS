import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Domain/entities/user.entity';
import { UsersService } from '../application/service/user.service';
import { UserController } from '../application/controller/user.controller';
import { Account } from '../Domain/entities/account.entity';
import { ShoppingCart } from 'src/Shopping-Managment/domain/entities/ShoppingCart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Account,ShoppingCart])],
  providers: [UsersService],
  controllers: [UserController]
})
export class AccountsModule {}

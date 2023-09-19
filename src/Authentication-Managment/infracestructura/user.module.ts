import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Domain/entities/user.entity';
import { UsersService } from '../application/service/user.service';
import { UserController } from '../application/controller/user.controller';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UserController]
})
export class AccountsModule {}

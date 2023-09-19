import { Module } from '@nestjs/common';
import { AccountsService } from '../application/service/accounts.service';
import { AccountsController } from '../application/controller/accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Domain/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [AccountsService],
  controllers: [AccountsController]
})
export class AccountsModule {}

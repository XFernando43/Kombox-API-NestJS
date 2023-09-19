import { Module } from '@nestjs/common';
import { AuthenticationController } from '../application/controller/authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../Domain/entities/account.entity';
import { AuthenticationService } from '../application/service/authentication.service';

@Module({
  imports:[TypeOrmModule.forFeature([Account])],
  providers: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}

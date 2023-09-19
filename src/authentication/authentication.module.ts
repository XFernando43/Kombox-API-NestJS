import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Account])],
  providers: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}

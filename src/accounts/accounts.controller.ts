import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('Account')
export class AccountsController {

    constructor(private accountService:AccountsService){

    }

    @Get()
    getAccount(){
        return this.accountService.getAccount();
    }

}

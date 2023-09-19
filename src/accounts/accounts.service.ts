import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
    // constructor(@Injec)
    async getAccount(){
        return 'HOLA SOY UN ACCOUNT';
    }
}

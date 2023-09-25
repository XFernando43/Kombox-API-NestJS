import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/Authentication-Managment/Domain/entities/account.entity';
import { User } from 'src/Authentication-Managment/Domain/entities/user.entity';
import { UserRequest } from 'src/Authentication-Managment/Domain/request/user.request';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { categoryRequest } from 'src/product-managment/Domain/request/categoryRequest';
import { ShoppingCart } from 'src/Shopping-Managment/domain/entities/ShoppingCart.entity';
import { PaymentState } from 'src/Shopping-Managment/domain/enums/paymentState';

@Injectable()
export class UsersService {
    constructor
    (@InjectRepository(User) private UserRepository:Repository<User>,
     @InjectRepository(Account) private AccountRepository:Repository<Account>,
    //  @InjectRepository(ShoppingCart) private ShoppingCartRepository:Repository<ShoppingCart>
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
            
            //Shopping Cart
            /* 
            let newShoppingCart = new ShoppingCart();
            newShoppingCart.items = null;
            newShoppingCart.totalPrice = 0;
            newShoppingCart.paymentDate = null;
            newShoppingCart.paymentStatus = PaymentState.NOT_ARTICLES;
            newShoppingCart.userId = newUser;
            const ShoppingCartToDb = await this.ShoppingCartRepository.create(newShoppingCart);
            */
            //
            
            
            await this.UserRepository.save(newUser);
            await this.AccountRepository.save(newAccount);        
            
            // await this.ShoppingCartRepository.save(ShoppingCartToDb)
            
            return newAccount;
        } catch (error) {
          return new HttpException('Conflict', HttpStatus.CONFLICT);
        }
      }
    
}

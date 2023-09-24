import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from 'src/Shopping-Managment/domain/entities/ShoppingCart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartService {
    constructor(@InjectRepository(ShoppingCart)private shoppingCartRepository:Repository<ShoppingCart>){}

    async getAll(){
        return this.shoppingCartRepository.find();
    }

    async createShoppingCart(){
        // return this.shoppingCartRepository.create();
    }

}

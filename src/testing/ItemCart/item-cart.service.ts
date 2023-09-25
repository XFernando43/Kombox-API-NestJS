import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItems } from 'src/Shopping-Managment/domain/entities/cartItems.entity';
import { Repository } from 'typeorm';
import { ItemCartRequest } from './request/itemCartRequest';
import { product } from 'src/product-managment/Domain/entities/product.entity';

@Injectable()
export class ItemCartService {
    constructor(@InjectRepository(CartItems) private CarItemsRepository: Repository<CartItems>,
                @InjectRepository(product) private ProductRepository:Repository<product>        
    ){}

    async getAllCartItems(){
        return await this.CarItemsRepository.find();
    }

    async postCartItems(itemCartRequest:ItemCartRequest){
        return await this.ProductRepository.find({
             where:{
                 productId:itemCartRequest.productId
            }
        })
    }

}

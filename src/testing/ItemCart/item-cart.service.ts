import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItems } from 'src/Shopping-Managment/domain/entities/cartItems.entity';
import { Repository } from 'typeorm';
import { ItemCartRequest } from './request/itemCartRequest';
import { product } from 'src/product-managment/Domain/entities/product.entity';
import { ShoppingCart } from 'src/Shopping-Managment/domain/entities/ShoppingCart.entity';

@Injectable()
export class ItemCartService {
    constructor(@InjectRepository(CartItems) private CarItemsRepository: Repository<CartItems>,
                @InjectRepository(product) private ProductRepository:Repository<product>,
                @InjectRepository(ShoppingCart) private ShoppingCartRepository:Repository<ShoppingCart>    
    ){}

    async getAllCartItems(){
        return await this.CarItemsRepository.find();
    }

    async postCartItems(itemCartRequest:ItemCartRequest){
        //new itemCart
        let ItemCart = new CartItems();

        //Validar si existe el producto
        const productAux = await this.ProductRepository.findOne({
             where:{productId:itemCartRequest.productId}
        })
        if(!productAux){
            return new HttpException('Product not found', HttpStatus.CONFLICT);
        }
        //validar que el shopping Cart Existe
        const shoppingCartAux = await this.ShoppingCartRepository.findOne({
            where:{shoppingCartId:itemCartRequest.ShoppingCartId}
        })
        if(!shoppingCartAux){
            return new HttpException('ShoppingCart Does not exist', HttpStatus.CONFLICT);
        }

        // product y itemCart Exist

        /*
        
        */
         

        ItemCart.AddedDate = new Date();
        ItemCart.productId = productAux;
        ItemCart.quantity = itemCartRequest.quantity;
        ItemCart.shoppingCart = shoppingCartAux;

        const itemCartToSave = await this.CarItemsRepository.create(ItemCart);
        return await this.CarItemsRepository.save(itemCartToSave);
        
    }

}
 
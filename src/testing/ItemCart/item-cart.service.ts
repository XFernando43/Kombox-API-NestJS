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
        return await this.CarItemsRepository.find({ relations: ['ProductId', 'Shopping_Cart'] });
    }

    async getItemCartId(itemId:number){
        return await this.CarItemsRepository.findOne({
            relations: ['ProductId', 'Shopping_Cart'] ,
            where:{
                itemCartId:itemId
            }
        })
    }

    async getItemCartByShoppingCart(shoppingId:number){

        const cartFromDb = this.ShoppingCartRepository.findOne({
            where:{
                shoppingCartId:shoppingId
            }
        });

        let cart = new ShoppingCart();

        cart.items = null;
        cart.paymentDate = (await cartFromDb).paymentDate;
        cart.paymentStatus = (await cartFromDb).paymentStatus;
        cart.shoppingCartId = (await cartFromDb).shoppingCartId;
        cart.totalPrice = 32;
        cart.userId = (await cartFromDb).userId;

        return await this.CarItemsRepository.findOne({
            where:{
               Shopping_Cart:cart
            }
        });
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
        console.log("ACA --> ",productAux,"\n","\n","\n");
        //validar que el shopping Cart Existe
        const shoppingCartAux = await this.ShoppingCartRepository.findOne({
            where:{shoppingCartId:itemCartRequest.ShoppingCartId}
        })
        if(!shoppingCartAux){
            return new HttpException('ShoppingCart Does not exist', HttpStatus.CONFLICT);
        }

        // validar de un producto ya agregado para que solo se actualize

        const existingItemCart = await this.CarItemsRepository.findOne({
            where:{
                ProductId:productAux,
                Shopping_Cart:shoppingCartAux
            }
        })

        console.log("ACA --> ",existingItemCart,"\n","\n","\n");

        if(existingItemCart){
            existingItemCart.quantity += itemCartRequest.quantity;
            this.CarItemsRepository.update(existingItemCart.itemCartId,existingItemCart);
            return existingItemCart;
        }
        // validar de un producto ya agregado para que solo se actualize

        ItemCart.AddedDate = new Date();
        ItemCart.ProductId = productAux;
        ItemCart.quantity = itemCartRequest.quantity;
        ItemCart.Shopping_Cart = shoppingCartAux;

        const itemCartToSave = await this.CarItemsRepository.create(ItemCart);
        return await this.CarItemsRepository.save(itemCartToSave);
        
    }

}
 
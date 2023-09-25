import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemCartService } from './item-cart.service';
import { ItemCartRequest } from './request/itemCartRequest';

@Controller('item-cart')
@ApiTags('item-cart')
export class ItemCartController {
    constructor(private ItemCartService:ItemCartService){}

    @Get()
    getItemCarts(){
        return this.ItemCartService.getAllCartItems(); 
    }

    @Get(':itemId')
    getItemCartById(@Param('itemId') itemId:number){
        return this.ItemCartService.getItemCartId(itemId);
    }

    @Post()
    getItemCart(@Body() itemCartRequest:ItemCartRequest){
        return this.ItemCartService.postCartItems(itemCartRequest);
    }

    @Get('getItemByShoppingCart/:shoppingCartId')
    getItemsByShoppingCart(@Param('shoppingCartId') shoppingCartId:number){
        return 'HOLI :3';
    }
}

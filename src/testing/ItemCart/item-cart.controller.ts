import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemCartService } from './item-cart.service';
import { ItemCartRequest } from './request/itemCartRequest';

@Controller('item-cart')
@ApiTags('item-cart')
export class ItemCartController {
    constructor(private ItemCartService:ItemCartService){}

    @Post()
    getItemCart(@Body() itemCartRequest:ItemCartRequest){
        return this.ItemCartService.postCartItems(itemCartRequest);
    }

    // @Post()
    // PostItemCart(@Body() itemCartRequest:any){

    // }
}

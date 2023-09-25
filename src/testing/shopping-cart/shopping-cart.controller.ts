import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { ShoppingCart } from 'src/Shopping-Managment/domain/entities/ShoppingCart.entity';

@Controller('shopping-cart')
@ApiTags('Shopping-cart')
export class ShoppingCartController {

    constructor(){

    }


}

import { Module } from '@nestjs/common';
import { ItemCartService } from './item-cart.service';
import { ItemCartController } from './item-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItems } from 'src/Shopping-Managment/domain/entities/cartItems.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CartItems])],
  providers: [ItemCartService],
  controllers: [ItemCartController]
})
export class ItemCartModule {}

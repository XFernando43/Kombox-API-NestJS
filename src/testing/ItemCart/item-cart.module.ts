import { Module } from '@nestjs/common';
import { ItemCartService } from './item-cart.service';
import { ItemCartController } from './item-cart.controller';

@Module({
  providers: [ItemCartService],
  controllers: [ItemCartController]
})
export class ItemCartModule {}

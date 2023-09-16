import { Module } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from '../Domain/entites/product.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([product]), // Configura tu entidad aquí
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}

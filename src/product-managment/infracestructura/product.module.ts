import { Module } from '@nestjs/common';
import { ProductController } from '../application/controller/product.controller';
import { ProductService } from '../application/service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from '../Domain/entities/product.entity';
import { Cateogry } from '../Domain/entities/category.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([product,Cateogry]), // Configura tu entidad aquí
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

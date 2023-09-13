import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([product]), // Configura tu entidad aquí
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

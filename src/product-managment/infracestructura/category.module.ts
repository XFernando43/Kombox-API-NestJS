import { Module } from '@nestjs/common';
import { CategoryController } from '../application/controller/category.controller';
import { CategoryService } from '../application/service/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cateogry } from '../Domain/entities/category.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cateogry]),
  ], // aca es para que no te joda el repository
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}

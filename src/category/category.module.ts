import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Cateogry } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cateogry]),
  ], // aca es para que no te joda el repository
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}

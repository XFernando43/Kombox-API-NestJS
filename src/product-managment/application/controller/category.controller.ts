import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(private categoryService:CategoryService){

    }

    @Get()
    getCategories(){
        return this.categoryService.getCateogries();
    }

    @Get(':id')
    getCategoryId(@Param('id',ParseIntPipe) categoryId:number){
        return this.categoryService.getCategoryId(categoryId);
    }

    @Post()
    createCategory(@Body() category:any){
        return this.categoryService.createCategory(category);
    }

    @Delete(':categoryId')
    deleteCategory(@Param('categoryId',ParseIntPipe) categoryId:number){
        return this.categoryService.deleteCategory(categoryId);
    }

    @Patch(':categoryId')
    updateCategory(@Param('categoryId',ParseIntPipe) categoryId:number, @Body() category:any){
        return this.categoryService.updateCategory(categoryId,category);
    }
}   
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { type } from 'os';
import { product } from './product.entity';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){
    }

    @Get('GetAll')
    getProducts(){
        return this.productService.getProducts();
    }

    @Get(':productId')
    async getProductId(@Param('productId', ParseIntPipe) productId: number) {
        return this.productService.getProduct(productId); // Cambiado a getProduct y pasando productId como parámetro
    }

    @Post()
    async createProduct(@Body() newProduct: CreateProductDto){
        return this.productService.createProduct(newProduct);
    }

    @Delete(':productId')
    async DeleteProduct(@Param('productId',ParseIntPipe) productId:number){
        return this.productService.deleteProduct(productId);
    }

    @Patch(':productId')
    async updateProcut
    (@Param('productId',ParseIntPipe) productId:number,@Body() newProduct:any){
        return this.productService.updateProduct(productId,newProduct);
    }


}

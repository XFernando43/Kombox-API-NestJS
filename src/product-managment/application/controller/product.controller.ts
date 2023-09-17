import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ApiTags } from '@nestjs/swagger';
import { productRequest } from 'src/product-managment/Domain/request/productRequest';

@Controller('product')
@ApiTags('Products')
export class ProductController {

    constructor(private productService:ProductService){
    }

    @Get('GetAll')
    getProducts(){
        return this.productService.getProducts();
    }

    @Get(':productId')
    async getProductId(@Param('productId', ParseIntPipe) productId: number) {
        return this.productService.getProduct(productId); 
    }

    @Post()
    async createProduct(@Body() newProduct: productRequest){
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

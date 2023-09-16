import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { productRequest } from '../Domain/request/product.request';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){ }

    @Get()
    getProducts(){
        return this.productService.getProducts();
    }
    @Get('productId')
    getProductId(@Param(':productId') productId:number){
        return this.productService.getProduct(productId);
    }
    @Post()
    postProduct(@Body() productRequest:productRequest){
        return this.productService.createProduct(productRequest);
    }
    @Patch('productId')
    updateProduct(@Param(':productId',ParseIntPipe) productId:number, @Body() productRequest:productRequest){
        return this.productService.updateProduct(productId,productRequest);
    }
    @Delete('productId')
    deleteProductId(@Param(':productId') productId:number){
        return this.productService.deleteProduct(productId);
    }
}

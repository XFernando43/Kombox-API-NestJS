import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){
    }

    @Get('GetAll')
    getProducts(){
        return this.productService.getProducts();
    }

    @Post()
    createProduct(@Body() newProduct: CreateProductDto){
        return this.productService.createProduct(newProduct);
    }
}

import { Injectable } from '@nestjs/common';
import { product } from './product.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductService {
    constructor(@InjectRepository(product) private productRepository:Repository<product>){

    }

    async createProduct(_product:any) {
        const newProduct = this.productRepository.create(_product);
        return await this.productRepository.save(newProduct);
    }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { product } from '../Domain/entites/product.entity';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(product) private productRepository:Repository<product>){}

    async getProducts(){
        return await this.productRepository.find();
    }

    async getProduct(productId:number){
        return await this.productRepository.findOne({
            where:{
                productId:productId
            }
        })
    }

}

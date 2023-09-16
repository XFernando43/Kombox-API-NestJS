import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { product } from '../Domain/entites/product.entity';
import { productRequest } from '../Domain/request/product.request';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(product) private productRepository:Repository<product>){}

    async getProducts(){
        try{
            return await this.productRepository.find();
        }catch(error){
            throw new Error(`Error while searching products: ${error.message}`);
        }
    }

    async getProduct(productId:number){
        try{
            const productFromDb = await this.productRepository.findOne({
                where:{
                    productId:productId
                }
            })
            if(!productFromDb){
                return new HttpException('Product Doesnt Exists',HttpStatus.NOT_FOUND);
            }
            return productFromDb;
        }catch(error){
            throw new Error(`Error while searching product: ${error.message}`);
        }

    }

    async createProduct(_productRequest:productRequest){
        try{
            if (!_productRequest || Object.values(_productRequest).some(field => field === null || field === undefined || field === '')) {
                return new HttpException('Campos Vacios', HttpStatus.CONFLICT);
            }
            const foundProduct = await this.productRepository.findOne({
                where: {
                  name: _productRequest.name
                }
            });
            if (foundProduct) {
                return new HttpException('Product Already Exists', HttpStatus.CONFLICT);
            }
            const newProduct = this.productRepository.create(_productRequest);
            return await this.productRepository.save(newProduct);
        }catch(error){
            throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
        }
        
    }

    async deleteProduct(productId:number){
        try{
            const lengthProducts = await this.productRepository.count();
            if(productId===0 || productId === lengthProducts){
                return 'product no econtrado';
            }else{
                await this.productRepository.delete(productId);
                return 'Delete it';
            }
        }catch(error){
            throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
        }
    }

    async updateProduct(productId:number,_productRequest:productRequest){
        try{
            const lengthProducts = await this.productRepository.count();
            if(productId === 0 || productId === lengthProducts){
                return 'product no econtrado';
            }else{
                await this.productRepository.update(productId,_productRequest);
            }
        }catch(error){
            throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
        }
    }
}

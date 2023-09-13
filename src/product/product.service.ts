import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { product } from './product.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductService {
    constructor(@InjectRepository(product) private productRepository:Repository<product>){

    }

    async getProducts(){
        return await this.productRepository.find();
    }

    async getProduct(productId: number) {
        try {
            const product = await this.productRepository.findOne({
                where: {
                    productId: productId 
                }
            });
            if (!product) {
                return 'not found';
            }
            return product;
        } catch (error) {
            throw new Error(`Error al buscar el producto: ${error.message}`);
        }
    }

    async createProduct(_product: CreateProductDto) {
        try {
          if (!_product || Object.values(_product).some(field => field === null || field === undefined || field === '')) {
            return new HttpException('Campos Vacios', HttpStatus.CONFLICT);
          }
    
          const foundProduct = await this.productRepository.findOne({
            where: {
              name: _product.name
            }
          });
    
          if (foundProduct) {
            return new HttpException('Product Already Exists', HttpStatus.CONFLICT);
          }
    
          const newProduct = this.productRepository.create(_product);
          return await this.productRepository.save(newProduct);
    
        } catch (error) {
          throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
        }
      }

    async deleteProduct(productId:number){
        try{
            if(productId===0){
                return 'product no econtrado';
            }else{
                this.productRepository.delete(productId);
            }
        }catch(error){
            throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
        }
    }

    async updateProduct(productId:number, product:CreateProductDto){
        try{
            if(productId===0){
                return 'product no econtrado';
            }else{
                this.productRepository.update(productId,product);
            }
        }catch(error){
            throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
        }
    }
    
}

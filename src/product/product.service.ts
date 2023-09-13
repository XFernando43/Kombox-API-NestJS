import { Injectable } from '@nestjs/common';
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
    

    async createProduct(_product: any) {
        try {
            if (!_product || Object.values(_product).some(field => field === null || field === undefined || field === '')) {
                throw new Error('Por favor, completa todos los campos correctamente.');
            } else {
                const newProduct = this.productRepository.create(_product);
                return await this.productRepository.save(newProduct);
            }
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

    async updateProduct(productId:number, product:any){
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

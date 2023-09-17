import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { product } from 'src/product-managment/Domain/entities/product.entity';
import { productRequest } from 'src/product-managment/Domain/request/productRequest';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(product) private productRepository:Repository<product>){}
    
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
                return new HttpException('Product Doesnt Exists', HttpStatus.NOT_FOUND);
            }
            return product;
        } catch (error) {
            throw new Error(`Error al buscar el producto: ${error.message}`);
        }
    }
    async createProduct(_product: productRequest) {
        try {
          if (!_product || Object.values(_product).some(field => field === null || field === undefined || field === '')) {
            return new HttpException('Campos Vacios', HttpStatus.CONFLICT);
          }
        //   if (
        //     _product.status !== "FULLSTOCK" &&
        //     _product.status !== "NOTSTOCK" &&
        //     _product.status !== "INSTOCK" &&
        //     _product.status !== "DISCOUNTED"
        //   ) {
        //     return new HttpException('Status not valid', HttpStatus.CONFLICT);
        //   } 

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

    // async createProduct(_product: productRequest) {
    //     try {
    //       if (!_product || Object.values(_product).some(field => field === null || field === undefined || field === '')) {
    //         return new HttpException('Campos Vacios', HttpStatus.CONFLICT);
    //       }

    //       console.log("ACA --> " + _product.status);

    //       if (_product.status == 'FULLSTOCK' || _product.status.toString() == 'NOTSTOCK' || _product.status.toString() =='DISCOUNTED') {
    //         const foundProduct = await this.productRepository.findOne({
    //             where: {
    //               name: _product.name
    //             }
    //           });
    //           if (foundProduct) {
    //             return new HttpException('Product Already Exists', HttpStatus.CONFLICT);
    //           }
    //           const newProduct = this.productRepository.create(_product);
    //           return await this.productRepository.save(newProduct);
    //     }
    //     else{
    //         return new HttpException('Status not valid', HttpStatus.CONFLICT);
    //     }

    
    //     } catch (error) {
    //       throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    //     }
    // }

    async deleteProduct(productId:number){
        try{
            const length = await this.productRepository.count();
            if(productId===0 || length < productId){
                return 'product no econtrado';
            }else{
                this.productRepository.delete(productId);
            }
        }catch(error){
            throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
        }
    }
    async updateProduct(productId:number, product:productRequest){
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

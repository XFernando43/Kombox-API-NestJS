import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { product } from 'src/product-managment/Domain/entities/product.entity';
import { productRequest } from 'src/product-managment/Domain/request/productRequest';
import { ProductStatus } from 'src/product-managment/Domain/enums/ProductStatus';
import { Cateogry } from 'src/product-managment/Domain/entities/category.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(product) private productRepository:Repository<product>,
        @InjectRepository(Cateogry) private categoryRepository:Repository<Cateogry>){}
    
    async getProducts(){
        return await this.productRepository.find({relations: ['category'],});
    }

    async getProduct(productId: number) {
        try {
            const product = await this.productRepository.findOne({
                relations: ['category'],
                where: {
                    productId: productId,
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
          if (
            _product.status !== "FULLSTOCK" &&
            _product.status !== "NOTSTOCK" &&
            _product.status !== "INSTOCK" &&
            _product.status !== "DISCOUNTED") 
            {
                return new HttpException('Status not valid', HttpStatus.CONFLICT);
            }

            if(_product.stock === 0){
                _product.status = ProductStatus.OUTSTOCK;
            }

            const foundProduct = await this.productRepository.findOne({
                where: {
                    Productname: _product.producName
                }
            });
            
            if (foundProduct) {
                return new HttpException('Product Already Exists', HttpStatus.CONFLICT);
            }

            const category = await this.categoryRepository.findOne({
                where:{
                    categoryId:_product.categoryId
                }
            });
            
            if(!category){
                return new HttpException('Category Not found', HttpStatus.CONFLICT);
            }

            const newProduct = new product();
            newProduct.Productname = _product.producName;
            newProduct.ProductDescription = _product.producDescription;
            newProduct.Productprice = _product.productPrice;
            newProduct.stock = _product.stock;
            newProduct.status = _product.status;
            newProduct.category = category;

            return await this.productRepository.save(newProduct);
        } catch (error) {
          throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
        }
    }

    async deleteProduct(productId:number){
        try{
            const length = await this.productRepository.count();
            if(productId === 0){
                return 'product no econtrado';
            }else{
            }
            this.productRepository.delete(productId);
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cateogry } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Cateogry) private categoryRepository:Repository<Cateogry>){}

    async getCateogries(){
        return await this.categoryRepository.find();
    }

    async getCategoryId(categoryId:number){
        return await this.categoryRepository.findOne({
            where:{
                categoryId:categoryId
            }
        });
    }

    async createCategory(category:any){
        this.categoryRepository.create(category);
        return await this.categoryRepository.save(category);
    }

    async deleteCategory(categoryId:number){
        return await this.categoryRepository.delete(categoryId);
    }

    async updateCategory(categoryId:number, category:any){
        return await this.categoryRepository.update(categoryId,category);
    }

}

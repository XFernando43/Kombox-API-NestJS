import { Cateogry } from "../entities/category.entity"
import { ProductStatus } from "../enums/ProductStatus"

export class productRequest{
    name:string
    description:string
    price:string
    stock:number
    status: ProductStatus
    categoryId:number
}
import { Cateogry } from "../entities/category.entity"
import { ProductStatus } from "../enums/ProductStatus"

export class productRequest{
    producName:string
    producDescription:string
    productPrice:string
    stock:number
    status: ProductStatus
    categoryId:number
}
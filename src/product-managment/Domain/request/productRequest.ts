import { ProductStatus } from "../enums/ProductStatus"

export class productRequest{
    name:string
    description:string
    price:string
    stock:string
    status: ProductStatus
}
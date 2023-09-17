import { ProductStatus } from "../enums/ProductStatus"

export class productResponse{
    name:string
    description:string
    price:string
    stock:string
    status:ProductStatus
}
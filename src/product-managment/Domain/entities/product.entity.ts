import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ProductStatus } from "../enums/ProductStatus"

@Entity({name:'products'})
export class product{
    @PrimaryGeneratedColumn()
    productId:number
    @Column()
    name:string
    @Column()
    description:string
    @Column()
    price:string
    @Column()
    stock:string
    @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.INSTOCK })
    status: ProductStatus
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date
}
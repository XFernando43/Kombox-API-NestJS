import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ProductStatus } from "../enums/ProductStatus"
import { Cateogry } from "./category.entity"

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
    stock:number
    @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.INSTOCK })
    status: ProductStatus
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date

    //relationShip
    @ManyToOne(() => Cateogry, (category) => category.products)
    @JoinColumn({ name: 'category_id' }) // Especifica el nombre de la columna de clave foránea
    category: Cateogry;

}  
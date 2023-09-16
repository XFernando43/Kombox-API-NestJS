import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('Products')
export class product{
    @PrimaryGeneratedColumn()
    productId:number
    @Column()
    name:string
    @Column()
    description:string
    @Column()
    price:number
    @Column()
    stock:number
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt:Date
}
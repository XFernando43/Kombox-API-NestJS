import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { product } from "./product.entity";

@Entity({name:'Categories'})
export class Cateogry{
    @PrimaryGeneratedColumn()
    categoryId:number
    @Column()
    name:string

    @OneToMany(() => product, (product) => product.category)
    products: product[];
}
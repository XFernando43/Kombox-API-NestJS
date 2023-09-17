import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'Categories'})
export class Cateogry{
    @PrimaryGeneratedColumn()
    categoryId:number
    @Column()
    name:string
}
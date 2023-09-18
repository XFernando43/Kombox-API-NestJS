import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity('Accounts')
class Account{
    @PrimaryGeneratedColumn()
    accountId:number
    @Column()
    email:string
    @Column()
    password:string
}
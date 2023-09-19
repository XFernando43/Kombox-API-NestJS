import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('Accounts')
export class Account{
    @PrimaryGeneratedColumn()
    accountId:number
    @Column()
    email:string
    @Column()
    password:string
}
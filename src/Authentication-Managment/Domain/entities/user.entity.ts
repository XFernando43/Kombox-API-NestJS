import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./account.entity"

@Entity('Users')
export class User{
    @PrimaryGeneratedColumn()
    userId:number
    @Column()
    name:string
    @Column()
    lastname:string
    @Column()
    phone:string
    @Column({ type: 'datetime'})
    birthDate:Date

    @OneToOne(()=> Account,(Account)=>Account.user)
    @JoinColumn() //genera la foreign KEy
    account:Account;

}
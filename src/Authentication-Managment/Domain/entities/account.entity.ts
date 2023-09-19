import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";

@Entity('Accounts')
export class Account{
    @PrimaryGeneratedColumn()
    accountId:number
    @Column()
    email:string
    @Column()
    password:string

    @OneToOne(() => User, (user) => user.account)
    @JoinColumn({name:'UserFk'}) //genera la foreign KEy
    user: User;
}
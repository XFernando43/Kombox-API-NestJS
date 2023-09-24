import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./account.entity"
import { ShoppingCart } from "src/Shopping-Managment/domain/entities/ShoppingCart.entity"

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
    account:Account;

    @ManyToOne(()=>ShoppingCart,(ShoppingCart)=>ShoppingCart.shoppingCartId)
    shoppingCarts:ShoppingCart[]

}
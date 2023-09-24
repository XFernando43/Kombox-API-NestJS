import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { PaymentState } from "../enums/paymentState"
import { CartItems } from "./itemCart.entiy"
import { User } from "src/Authentication-Managment/Domain/entities/user.entity"

@Entity('ShoppingCarts')
export class ShoppingCart{
    @PrimaryGeneratedColumn()
    shoppingCartId:number

    @OneToMany(()=>User,(User)=>User.userId)
    userId:User

    @Column()
    paymentStatus:PaymentState

    @Column({type:'date',default:()=>'CURRENT_STAMP'})
    paymentDate:Date

    @Column()
    totalPrice:number

    @OneToMany(()=>CartItems,(item)=>item.shoppingCart)
    items:CartItems[]
}
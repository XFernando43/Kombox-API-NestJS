import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { PaymentState } from "../enums/paymentState"
import { User } from "src/Authentication-Managment/Domain/entities/user.entity"
import { CartItems } from "./cartItems.entity"

@Entity('ShoppingCarts')
export class ShoppingCart{
    @PrimaryGeneratedColumn()
    shoppingCartId:number

    @ManyToOne(()=>User,(User)=>User.userId)
    @JoinColumn({name:'UserId'})
    userId:User

    @Column()
    paymentStatus:PaymentState

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    paymentDate:Date

    @Column()
    totalPrice:number

    @OneToMany(()=>CartItems,(item)=>item.shoppingCart)
    items:CartItems[]
}
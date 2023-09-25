import { product } from "src/product-managment/Domain/entities/product.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { ShoppingCart } from "./ShoppingCart.entity"

@Entity('CartItems')
export class CartItems{
    @PrimaryGeneratedColumn()
    itemCartId:number
    
    @Column({type:'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    AddedDate:Date

    @ManyToOne(()=>product,(product)=>product.itemCart)
    @JoinColumn({name:'ProductId'})
    productId:product 
    
    @Column()
    quantity:number

    @ManyToOne(()=> ShoppingCart,(cart)=>cart.items)
    @JoinColumn({ name: 'Shoppingcart_Id' })
    shoppingCart:ShoppingCart
}
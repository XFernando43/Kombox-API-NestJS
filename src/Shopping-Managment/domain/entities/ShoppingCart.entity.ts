import { PaymentState } from "../enums/paymentState"

export class ShoppingCart{
    shoppingCartId:number
    userId:number
    paymentStatus:PaymentState
    paymentDate:Date
    totalPrice:number
}
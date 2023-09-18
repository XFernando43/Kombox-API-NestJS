import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { kindUser } from "../enum/kindUser"

@Entity('Users')
class User{
    @PrimaryGeneratedColumn()
    userId:number
    @Column()
    name:string
    @Column()
    lastName:string
    @Column()
    bornDate:Date
    @Column()
    nacionalidad:string
    @Column({ type: 'enum', enum: kindUser, default: kindUser.CLIENT })
    typeUser:kindUser
}
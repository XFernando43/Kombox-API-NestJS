import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
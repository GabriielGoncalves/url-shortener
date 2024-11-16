import { Column, Entity } from "typeorm";
import BaseEntity from ".";

@Entity('Users')
export class User extends BaseEntity {    
    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text' })
    password: string;
}
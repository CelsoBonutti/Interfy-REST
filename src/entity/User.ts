import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne} from "typeorm";
import {Course} from "./Course";
import { Intensity } from "./Intensity";
import { Accomodation } from "./Accomodation";
import { Addon } from "./Addon";
@Entity()
 export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    phone: number;

    @Column({
        type: "enum",
        enum: [
            "M",
            "F",
            "O",
            "N"
        ]
    })
    gender: "M" | "F" | "O" | "N";

    @Column()
    active:boolean;

    @Column()
    verificationCode:string;

    @Column({
        type: "enum",
        enum: [
            "USER",
            "ADMIN",
        ]
    })
    role: "USER" | "ADMIN";
}

import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne,OneToOne,JoinColumn} from "typeorm";
import {Course} from "./Course";
import { Intensity } from "./Intensity";
import { Accomodation } from "./Accomodation";
import { Country } from "./Country";
import { School } from "./School";

@Entity()
 export class Addon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    required: boolean;

    @Column({
        type: "enum",
        enum: [
            'visa',
            'material',
            'insurance',
        ]
    })
    type: 'visa' | 'material' | 'insurance' ;

    @ManyToOne(type => School, School => School.addon)
    school: School;

    @OneToOne(type => Country)
    @JoinColumn()
    country: Country;
}
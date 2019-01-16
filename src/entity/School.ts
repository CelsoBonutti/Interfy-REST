import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne} from "typeorm";
import {Course} from "./Course";
import { Intensity } from "./Intensity";
import { Accomodation } from "./Accomodation";
@Entity()
 export class School {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    photos: string;

    @Column()
    age: number;

    @Column()
    infrastructure:string;

    @Column()
    extras:string;

    @OneToMany(type => Intensity, Intensity => Intensity.school)
    intensity:Intensity[];

    @OneToMany(type => OptionalSchema, OptionalSchema => OptionalSchema.School)
    optionals:OptionalSchema[];

    @OneToMany(type => Course, Course => Course.school)
    course:Course[];

    @OneToMany(type => Accomodation, Accomodation => Accomodation.school)
    accomodation:Accomodation[];
}
@Entity()
export class OptionalSchema {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => School, School => School.id)
    School: School;
    
    @Column()
    description: string;
    
    @Column()
    icon: string;
}



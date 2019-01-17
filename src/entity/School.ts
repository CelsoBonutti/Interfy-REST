import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne} from "typeorm";
import {Course} from "./Course";
import { Intensity } from "./Intensity";
import { Accomodation } from "./Accomodation";
import { Addon } from "./Addon";
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

    @OneToMany(type => Optional, Optional => Optional.School)
    optionals:Optional[];

    @OneToMany(type => Course, Course => Course.school)
    course:Course[];

    @OneToMany(type => Accomodation, Accomodation => Accomodation.school)
    accomodation:Accomodation[];

    @OneToMany(type => Addon, Addon => Addon.school)
    addon:Addon[];
}
@Entity()
export class Optional {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => School, School => School.optionals)
    School: School;
    
    @Column()
    description: string;
    
    @Column()
    icon: string;
}



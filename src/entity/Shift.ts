import {Entity, PrimaryGeneratedColumn,OneToOne,JoinColumn, Column,OneToMany,ManyToOne} from "typeorm";
import {Course} from "./Course";
import { Intensity } from "./Intensity";
import { Accomodation } from "./Accomodation";
import { School } from "./School";


@Entity()
export class Shift {

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string;

   @Column() 
   description:string;

   
   @OneToMany(type => Duration, Duration => Duration.shift)
   duration:Duration[];

   @OneToOne(type => School)
   @JoinColumn()
   school: School;

   @OneToOne(type => Intensity)
   @JoinColumn()
   intensity: Intensity;
}

@Entity()
 export class Duration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numberOfWeeks: number;

    @Column()
    price: string;

    @OneToMany(type=>DurationDate,DurationDate=>DurationDate.date)
    dates: DurationDate[];

    @ManyToOne(type => Shift, Shift => Shift.duration)
    shift: Shift;
 }

@Entity()
export class DurationDate {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Duration, Duration => Duration.dates)
    duration: Duration;
    
    @Column()
    date: Date;
}


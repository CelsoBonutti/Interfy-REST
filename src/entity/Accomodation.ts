import {Entity, PrimaryGeneratedColumn, Column,OneToOne,OneToMany,ManyToOne,JoinColumn} from "typeorm";
import {School} from "./School";

@Entity()
 export class Accomodation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: [
            "Single",
            "Shared",
        ]
    })
    roomType: "Single" | "Shared";

    @Column()
    name: string;

    @OneToMany(type => Supplies, Supplies => Supplies.accomodation ,{
        cascade: true,
    })
    supplies: Supplies[];

    @OneToOne(type => School)
    @JoinColumn()
    school: School;

    @OneToMany(type => DateRange, DateRange => DateRange.accomodation,{
        cascade: true,
    })
    dateRange: DateRange[];
}

@Entity()
export class Supplies {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Accomodation, Accomodation => Accomodation.supplies)
    accomodation: Accomodation;
    
    @Column()
    name: string;
    
    @Column()
    description:string;

    @Column()
    price:string;
}

@Entity()
export class DateRange {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Accomodation, Accomodation => Accomodation.supplies)
    accomodation: Accomodation;
    
    @Column()
    startDate: Date;
    
    @Column()
    endDate: Date;

    @Column()
    price:string;
}
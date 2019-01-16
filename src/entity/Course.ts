import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne} from "typeorm";
import {School} from "./School"
import {Intensity} from "./Intensity"
@Entity()
 export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => School, School => School.course)
    school: School;

    @OneToMany(type => Intensity, Intensity => Intensity.course)
    intensity:Intensity[];
}

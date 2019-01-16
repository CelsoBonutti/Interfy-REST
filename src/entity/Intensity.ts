import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne} from "typeorm";
import {School} from "./School"
import { Course } from "./Course";

@Entity()
 export class Intensity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => School, School => School.intensity)
    school: School;

    @ManyToOne(type => Course, Course => Course.intensity)
    course: Course;
}

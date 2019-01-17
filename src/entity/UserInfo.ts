import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne,OneToOne,JoinColumn} from "typeorm";
import {Course} from "./Course";
import { Intensity } from "./Intensity";
import { Accomodation } from "./Accomodation";
import { User } from "./User";
@Entity()
 export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    zip: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    neighborhood: string;

    @Column()
    street: string;
    
    @Column()
    complement: string;

    @Column()
    number: number;
}

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    relationship: string;

    @Column()
    phone: string;

    @ManyToOne(type => UserInfo, UserInfo => UserInfo.contact)
    userInfo: UserInfo;
}

@Entity()
export class MedicalInformation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    specialConditions: string;

    @Column()
    dietaryRestrictions: string;

    @Column()
    extraInfo: string;
}

@Entity()
export class UserInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    birthday: Date;

    @Column()
    cpf: number;

    @Column()
    languageLevel: string;

    @OneToOne(type => Address)
    @JoinColumn()
    address: Address;

    @OneToOne(type => MedicalInformation)
    @JoinColumn()
    medicalInformation: MedicalInformation;

    @OneToMany(type => Contact, Contact => Contact.userInfo)
    contact:Contact[];

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
}
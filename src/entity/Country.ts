import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne} from "typeorm";
import {Course} from "./Course";
import { Intensity } from "./Intensity";
import { Accomodation } from "./Accomodation";

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({length:2})
    acronym: string;

    @Column()
    capital: string;

    @Column()
    continent: string;

    @Column({
        type: "enum",
        enum: [
            "Mandarim",
            "Espanhol",
            "Ingles",
            "Bengali",
            "Portugues",
            "Russo",
            "Japones",
            "Alemao",
            "Chines",
            "Javanes",
            "Coreano",
            "Frances",
            "Vietnamita",
            "Telugo",
            "Cantones",
            "Marati",
            "Tamil",
            "Turco",
            "Urdu",
            "Italiano",

        ]
    })
    languages:  "Mandarim"|
    "Espanhol"|
    "Ingles"|
    "Bengali"|
    "Portugues"|
    "Russo"|
    "Japones"|
    "Alemao"|
    "Chines"|
    "Javanes"|
    "Coreano"|
    "Frances"|
    "Vietnamita"|
    "Telugo"|
    "Cantones"|
    "Marati"|
    "Tamil"|
    "Turco"|
    "Urdu"|
    "Italiano";

    @Column({length:3})
    currency: string;

    @Column()
    description: string;

    @Column()
    tips: string;
    
    @OneToMany(type => Visa, Visa => Visa.country,{
        cascade: true,
    })
    visa:Visa[];

    @OneToMany(type => Climate, Climate => Climate.country,{
        cascade: true,
    })
    climate:Climate[];
}

@Entity()
export class Climate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    season: string;

    @Column()
    months: string;

    @Column()
    weather: string;

    @Column()
    minTemp: number;

    @Column()
    maxTemp: number;

    @ManyToOne(type => Country, Country => Country.climate)
    country: Country;
}

@Entity()
export class Visa {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    description: string;
    
    @Column()
    difficulty: number;

    @ManyToOne(type => Country, Country => Country.visa)
    country: Country;
}



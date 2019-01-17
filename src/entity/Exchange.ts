import {Entity, PrimaryGeneratedColumn, Column,OneToMany,ManyToOne,OneToOne,JoinColumn} from "typeorm";
import {School} from "./School"
import { User } from "./User";

@Entity()
 export class Exchange {

    @PrimaryGeneratedColumn()
    id: number;

 

    @OneToOne(type => User)
    @JoinColumn()
    user: User;
   
    @Column({
        type: "enum",
        enum: [
            "processing",
            "authorized",
            "paid",
            "refunded",
            "waiting_payment",
            "pending_refund",
            "refused",
            "chargedback"
        ]
    })
    status:  "processing"|
            "authorized"|
            "paid"|
            "refunded"|
            "waiting_payment"|
            "pending_refund"|
            "refused"|
            "chargedback";

            @Column()
            purchaseDate: Date;

            @Column()
            updateDate: Date;

            @Column()
            transactionId: number;

   
            @OneToOne(type => ExchangeCourse)
            @JoinColumn()
            exchangeCourse: ExchangeCourse;
 
}


@Entity()
 export class ExchangeCourse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;

    @Column()
    cargaHoraria: string;

    @Column()
    turno: string;

    @Column()
    qntSemanas: number;

    @Column()
    dtInicio: Date;

    @Column()
    dtFim: Date;

    @Column()
    valor: string;

    @OneToOne(type => School)
    @JoinColumn()
    school: School;
   
}

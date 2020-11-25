import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Users } from "./users";

@Entity()
export class Tasks {

    @PrimaryGeneratedColumn('uuid', {name:'id'})
    id: string;

    @Column()
    descricao: string;

    @ManyToOne( ()=> Users, user => user.tasks)
    user: Users;

    @Column()
    status: string;

    @Column()
    data_inicio: Date;

    @Column()
    data_finalizacao: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    data_criacao: Date;
}
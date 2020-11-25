import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Tasks } from "./tasks";

@Entity()
export class Users {

    @PrimaryGeneratedColumn('uuid', {name:'id'})
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @OneToMany(() => Tasks, tascks => tascks.user,{cascade:true})
    tasks?: Tasks[];
}
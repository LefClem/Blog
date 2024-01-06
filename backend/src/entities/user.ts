import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Column()
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Field()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;
}
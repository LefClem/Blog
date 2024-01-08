import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";

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

    @OneToMany(() => Post, (post) => post.user)
    post: number;
}
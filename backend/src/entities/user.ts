import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    password: string;

    @Column()
    @Field()
    role: string;

    @OneToMany(() => Post, (post) => post.user)
    post: Post[];
}
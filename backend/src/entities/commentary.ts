import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post";

@ObjectType()
@Entity()
export class Commentary extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    commentary: string;

    @ManyToOne(() => Post, (post) => post.commentary)
    post: Post;
}
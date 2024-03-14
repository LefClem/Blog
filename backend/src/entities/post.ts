import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Commentary } from "./commentary";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    description: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.post)
    user: User;

    @Field(() => [Commentary])
    @OneToMany(() => Commentary, commentary => commentary.post,  { cascade: true, onDelete: "CASCADE"})
    commentaries: Commentary[];
}
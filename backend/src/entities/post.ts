import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    @ManyToOne(() => User, (user) => user.post )
    user: User;

    @Field()
    @OneToMany(() => Commentary, (commentary) => commentary.post)
    commentary: Commentary;
}
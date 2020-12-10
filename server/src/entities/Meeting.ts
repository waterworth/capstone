import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Meeting extends BaseEntity{

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  title!: string;

}
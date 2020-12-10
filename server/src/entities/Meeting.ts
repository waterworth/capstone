import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
@Entity()
export class Meeting extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  timeslot!: string;

  @Field()
  @Column()
  hostId: number;

  @ManyToOne(() => User, (user) => user.meetings)
  host: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

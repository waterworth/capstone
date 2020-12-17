import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
  hostId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.meetings)
  host: User;

  @Field(() => [String])
  @Column({ nullable: true })
  users!: string;

  @Field()
  @Column({ nullable: true })
  timeslot!: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({ nullable: true })
  length!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

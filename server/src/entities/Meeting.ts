import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MeetingDetails } from './MeetingDetails';
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
  hostId!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.meetings)
  host!: User;

  @Field()
  @ManyToMany(() => MeetingDetails, (md) => md.user, { cascade: true })
  @JoinTable()
  participants!: User;

  @Field()
  @Column({ nullable: true })
  timeslot!: Date;

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

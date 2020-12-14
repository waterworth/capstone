import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Field, Field, Int, ObjectType } from 'type-graphql';
import { Meeting } from './Meeting';
import { MeetingDetails } from './MeetingDetails';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Boolean)
  @Column()
  isAdmin!: boolean;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => MeetingDetails, (md) => md.meeting)
  meetings: Meeting[];

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

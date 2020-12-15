import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, Field, Int, ObjectType } from 'type-graphql';
import { Meeting } from './Meeting';
import { join } from 'path';
import { MeetingUser } from './MeetingUser';
// import { MeetingParticipants } from './MeetingParticipants';

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

  @Field()
  @Column()
  image: string;

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Meeting, (meeting) => meeting.users)
  @JoinTable()
  meetings!: Meeting;

  // Change to many to many
  // @OneToMany(() => MeetingParticipants, (md) => md.meeting)
  // meetings: Meeting[];
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

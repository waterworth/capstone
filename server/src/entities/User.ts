import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Meeting } from './Meeting';
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

import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Meeting } from './Meeting';
import { User } from './User';

@ObjectType()
@Entity()
export class MeetingDetails extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  meetingId: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => Meeting)
  @ManyToMany(() => Meeting, (meeting) => meeting.participants)
  meeting: Meeting;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.meetings)
  user: User;
}

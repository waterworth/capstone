import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Meeting } from './Meeting';
import { User } from './User';

//Many to Many
// User <-> Meeting
// User -> MeetingUser <- Meeting

@ObjectType()
@Entity()
export class MeetingUser extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => Meeting, (meeting) => meeting.users)
  user: User;

  @Field()
  @PrimaryColumn()
  meetingId: number;

  @Field(() => Meeting)
  @ManyToOne(() => User, (user) => user.meetings)
  meeting: Meeting;
}

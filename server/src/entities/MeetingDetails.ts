import { Field, Int, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryColumn
} from 'typeorm';
import { Meeting } from './Meeting';
import { User } from './User';
  
  @ObjectType()
  @Entity()
  export class MeetingDetails extends BaseEntity {
    @Field(() => Int)
    @PrimaryColumn()
    meetingId!: number;

    @Field(() => Meeting)
    @ManyToOne(() => Meeting, (meeting) => meeting.participants)
    meeting!: Meeting;

    @Field()
    @PrimaryColumn()
    userId!: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.meetings)
    user!: User;


  
  
  }
  
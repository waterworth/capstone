import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Meeting } from './Meeting';
import { User } from './User';

//Many to Many
// User <-> Meeting
// User -> MeetingUser <- Meeting

@Entity()
export class MeetingUser extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  meetingId: number;

  @ManyToOne(() => User, (user) => user.meetings)
  user: User;

  @ManyToOne(() => Meeting, (meeting) => meeting.users)
  meeting: Meeting;
}

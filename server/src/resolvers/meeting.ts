import { MeetingUser } from '../entities/MeetingUser';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Meeting } from '../entities/Meeting';
// import { MeetingParticipants } from '../entities/MeetingParticipants';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
@InputType()
class MeetingInput {
  @Field()
  title!: string;
  @Field()
  timeslot: Date;
  @Field()
  length: number;
  @Field()
  description: string;
  @Field(() => [String], { nullable: true })
  users: [string];
}

@Resolver()
export class MeetingResolver {
  // Read
  @Query(() => [Meeting])
  async meetings(): Promise<Meeting[]> {
    const qb = getConnection()
      .getRepository(Meeting)
      .createQueryBuilder('meeting')
      .innerJoinAndSelect('meeting.host', 'u', 'u.id = meeting."hostId"');
    const posts = await qb.getMany();
    return posts;
  }
  @Query(() => Meeting, { nullable: true })
  async meeting(
    @Arg('id', () => Int) id: number
  ): Promise<Meeting | undefined> {
    return Meeting.findOne(id, { relations: ['host'] });
  }

  // Create
  @Mutation(() => Meeting)
  @UseMiddleware(isAuth)
  async createMeeting(
    @Arg('input') input: MeetingInput,
    @Ctx() { req }: MyContext
  ): Promise<Meeting> {
    return Meeting.create({
      ...input,
      hostId: req.session.userId,
    }).save();
  }
  // Update
  @Mutation(() => Meeting, { nullable: true })
  async updateMeeting(
    @Arg('id') id: number,
    @Arg('title', () => String) title: string,
    @Arg('timeslot', () => String) timeslot: string
  ): Promise<Meeting | null> {
    const meeting = await Meeting.findOne(id);
    if (!meeting) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Meeting.update({ id }, { title });
    }
    if (typeof timeslot !== 'undefined') {
      await Meeting.update({ id }, { timeslot });
    }
    return meeting;
  }
  // Delete
  @Mutation(() => Boolean)
  async deleteMeeting(@Arg('id') id: number): Promise<boolean> {
    try {
      await Meeting.delete(id);
    } catch {
      return false;
    }
    return true;
  }
}

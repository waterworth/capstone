import { MyContext } from '../types';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Meeting } from '../entities/Meeting';
import { isAuth } from '../middleware/isAuth';
import { getConnection } from 'typeorm';

@Resolver()
export class MeetingDetailsResolver {
  @Mutation(() => Meeting)
  @UseMiddleware(isAuth)
  async addUserToMeeting(
    @Arg('meetingId') meetingId: number,
    @Arg('userId') userId: number,
    @Ctx() { }: MyContext
  ) { 

    
  }

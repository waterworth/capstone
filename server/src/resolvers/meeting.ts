import { Meeting } from "../entities/Meeting";
import { Arg, Mutation, Query, Resolver, InputType, Field, Ctx, UseMiddleware } from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { MeetingDetails } from "../entities/MeetingDetails";
import { User } from "../entities/User";


@InputType()
class MeetingInput{
  @Field()
  title!: string;
  @Field()
  timeslot: Date;
  @Field()
  length: number;
  @Field()
  description: string;
}

@Resolver()
export class MeetingResolver{


    @Mutation(() => Meeting)
    @UseMiddleware(isAuth)
    async addUserToMeeting(
        @Arg('meetingId') meetingId: number,
        @Arg('userId') userId: number,
        @Ctx() {} : MyContext){
        await MeetingDetails.insert({
            meetingId,
            userId,
        })
        await getConnection().query(`
            update meeting m
            set participants = participants + $1
            where m.id = $2
        `, [userId, meetingId])
        return true;
    }



    // Read
    @Query(() => [Meeting])
    async meetings(): Promise<Meeting[]> {
      const qb = getConnection()
        .getRepository(Meeting)
        .createQueryBuilder('meeting')
        .innerJoinAndSelect(
            "meeting.host",
            "u",
            'u.id = meeting."hostId"',
        )  
        const posts = await qb.getMany();
        return posts;
    }
    // Create
    @Query(() => Meeting, {nullable: true})
    meeting(@Arg('id') id: number): Promise<Meeting | undefined> {
      return Meeting.findOne(id);  
    }
    @Mutation(() => Meeting)
    @UseMiddleware(isAuth)



    async createMeeting(
        @Arg('input') input: MeetingInput,
        @Ctx() {req} : MyContext
    ): Promise<Meeting> {
        return Meeting.create({...input, hostId: req.session.userId}).save();
    }
    // Update
    @Mutation(() => Meeting, {nullable: true})
    async updateMeeting(
        @Arg('id') id: number, 
        @Arg('title', () => String) title: string,
        @Arg('timeslot', () => String) timeslot: string,
    ): Promise<Meeting | null> {
        const meeting = await Meeting.findOne(id);
            if(!meeting){
                return null
            }
            if(typeof title !== 'undefined'){
                await Meeting.update({id}, {title})
            }
            if(typeof timeslot !== 'undefined'){
                await Meeting.update({id}, {timeslot})
            }
        return meeting;
    }
    // Delete
    @Mutation(() => Boolean)
    async deleteMeeting(@Arg('id') id: number): Promise<boolean> {
        try{
        await Meeting.delete(id)
        } catch {
            return false
        };
        return true
    }
}
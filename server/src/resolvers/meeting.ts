import { Meeting } from "../entities/Meeting";
import { Arg, Mutation, Query, Resolver, InputType, Field, Ctx, UseMiddleware } from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";


@InputType()
class MeetingInput{
  @Field()
  title: string;
  @Field()
  timeslot: string;
}
@Resolver()
export class MeetingResolver{
    // Read
    @Query(() => [Meeting])
    async meetings(): Promise<Meeting[]> {
      return Meeting.find();  
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
    ): Promise<Meeting | null> {
        const meeting = await Meeting.findOne(id);
            if(!meeting){
                return null
            }
            if(typeof title !== 'undefined'){
                await Meeting.update({id}, {title})
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
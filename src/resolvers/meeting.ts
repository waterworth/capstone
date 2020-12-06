import { Meeting } from "../entities/Meeting";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class MeetingResolver{
    // Read
    @Query(() => [Meeting])
    meetings(
        @Ctx() {em}: MyContext): Promise<Meeting[]> {
      return em.find(Meeting, {});  
    }
    // Create
    @Query(() => Meeting, {nullable: true})
    meeting(
        @Arg('id') id: number, 
        @Ctx() {em}: MyContext
    ): Promise<Meeting | null> {
      return em.findOne(Meeting, {id});  
    }
    @Mutation(() => Meeting)
    async createMeeting(
        @Arg('title') title: String, 
        @Ctx() {em}: MyContext
    ): Promise<Meeting> {
        const meeting = em.create(Meeting, {title})
        await em.persistAndFlush(meeting);
        return meeting;
    }
    // Update
    @Mutation(() => Meeting, {nullable: true})
    async updateMeeting(
        @Arg('id') id: number, 
        @Arg('title', () => String) title: string,
        @Ctx() {em}: MyContext
    ): Promise<Meeting | null> {
        const meeting = await em.findOne(Meeting, {id});
            if(!meeting){
                return null
            }
            if(typeof title !== 'undefined'){
                meeting.title = title
                await em.persistAndFlush(meeting);
            }
        return meeting;
    }
    // Delete
    @Mutation(() => Boolean)
    async deleteMeeting(
        @Arg('id') id: number, 
        @Ctx() {em}: MyContext
    ): Promise<boolean> {
        try{
        await em.nativeDelete(Meeting, {id})
        } catch {
            return false
        };
        return true
    }
}
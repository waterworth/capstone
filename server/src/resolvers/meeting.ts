// import {
//   Arg,
//   Ctx,
//   Field,
//   FieldResolver,
//   InputType,
//   Int,
//   Mutation,
//   Query,
//   Resolver,
//   Root,
//   UseMiddleware,
// } from 'type-graphql';
// import { getConnection } from 'typeorm';
// import { Meeting } from '../entities/Meeting';
// import { User } from '../entities/User';
// // import { MeetingParticipants } from '../entities/MeetingParticipants';
// import { isAuth } from '../middleware/isAuth';
// import { MyContext } from '../context';
// @InputType()
// class MeetingInput {
//   @Field()
//   title!: string;
//   @Field()
//   timeslot: string;
//   @Field(() => Int)
//   length: number;
//   @Field()
//   description: string;
//   @Field(() => [Int])
//   userIds: number[];
// }

// @Resolver(Meeting)
// export class MeetingResolver {
//   @FieldResolver(() => User)
//   host(@Root() meeting: Meeting, @Ctx() { hostLoader }: MyContext) {
//     return hostLoader.load(meeting.hostId);
//   }

//   // @FieldResolver(() => User)
//   // async users(@Root() meeting: Meeting, @Ctx() { userLoader }: MyContext) {
//   //   return userLoader.load(meeting.userIds);
//   // }

//   // Read
//   // Read
//   @Query(() => [Meeting])
//   async meetings(): Promise<Meeting[]> {
//     return Meeting.find();
//   }

//   @Query(() => Meeting, { nullable: true })
//   async meeting(
//     @Arg('id', () => Int) id: number
//   ): Promise<Meeting | undefined> {
//     return Meeting.findOne(id);
//   }

//   // Create
//   @Mutation(() => Meeting)
//   @UseMiddleware(isAuth)
//   async createMeeting(
//     @Arg('input') input: MeetingInput,
//     @Ctx() { req }: MyContext
//   ): Promise<Meeting> {
//     return Meeting.create({
//       ...input,
//       hostId: req.session.userId,
//     }).save();
//   }
//   // Update
//   @Mutation(() => Meeting, { nullable: true })
//   @UseMiddleware(isAuth)
//   async updateMeeting(
//     @Arg('id', () => Int) id: number,
//     @Arg('title') title: string,
//     @Arg('timeslot') timeslot: string,
//     @Arg('description') description: string
//   ): Promise<Meeting | null> {
//     const result = await getConnection()
//       .createQueryBuilder()
//       .update(Meeting)
//       .set({ title, timeslot, description })
//       .where('id = :id', {
//         id,
//       })
//       .returning('*')
//       .execute();
//     return result.raw[0];
//   }
//   // Delete
//   @Mutation(() => Boolean)
//   @UseMiddleware(isAuth)
//   async deleteMeeting(@Arg('id', () => Int) id: number): Promise<boolean> {
//     try {
//       await Meeting.delete(id);
//     } catch {
//       return false;
//     }
//     return true;
//   }
// }

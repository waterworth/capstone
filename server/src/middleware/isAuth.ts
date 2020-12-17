import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";

export const isAuth: MiddlewareFn<MyContext> = async ({context}, next) => {
    
    const details = await User.findOne(context.req.session.userId)
    if(!details?.isAdmin){
        throw new Error ("Not authorized to add users to meetings")
    }
    return next();
}
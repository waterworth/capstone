import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/User";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    
    async function getUserDetails (){
        const details = await User.findOne(context.req.session.userID)
        console.log("current logged in user: " + context.req.session.userID)
        console.log("searched for user" + details.id)
    }
    getUserDetails()
    return next();
}
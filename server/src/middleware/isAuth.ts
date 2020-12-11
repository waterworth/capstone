import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    if(!context.req.session.userId){
        throw new Error('Not signed in.')
    }
    return next();
}

// TODO - Change this authentication to if(!isAdmin)
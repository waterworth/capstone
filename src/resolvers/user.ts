import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput{
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError{
    @Field()
    field: string
    @Field()
    message: string
}


@ObjectType()
class UserResponse{
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true})
    user?: User

}


@Resolver()
export class UserResolver{
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em}: MyContext 
    ): Promise<UserResponse>{
            if(options.username.length <= 2){
                return {
                    errors: [
                        {
                        field: "username",
                        message: "Username must be longer than 2 characters."
                    }]
                }
            }
            if(options.password.length <= 5){
                return{
                    errors: [{
                        field: "password",
                        message: "Password must be longer than 8 characters."
                    }]
                }
            }


        const hasedPassword = await argon2.hash(options.password)
        const user = em.create(User, {username: options.username, password: hasedPassword})
        try{
            await em.persistAndFlush(user)
        }
        catch(err){
            //Duplicate username
            if(err.code === '23505'){
                return {
                    errors: [
                        {
                        field: "username",
                        message: "Username already in use",
                    }
                ]
                }
            }
            console.log("Message, " + err.message)
        }
        return {user};
    }


    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em}: MyContext 
    ) : Promise<UserResponse>{
        const user = await em.findOne(User, {username: options.username.toLowerCase()})
        if(!user){
            return {
                errors: [{
                    field: "username",
                    message: "Username not found."
                 }]
            }
        }
        const valid = await argon2.verify(user.password, options.password)
        if(!valid){
            return{
                errors:[{
                    field: "password",
                    message: "Password was incorrect"
                }]
            }
        }


        return {user};
    }
}
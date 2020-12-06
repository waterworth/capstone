import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
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
    @Query(() => User, {nullable: true})
    async me(
        @Ctx() {req, em}: MyContext 
    ){
        // Log in check
        if(!req.session.userId){
            return null
        }
        const user = await em.findOne(User, {id: req.session.userId});
        return user
    }



    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext 
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
        }
        // Logs in user after registration through cookie storage
        req.session.userId = user.id;

        return {user};
    }


    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext 
    ) : Promise<UserResponse>{
        const user = await em.findOne(User, {username: options.username})
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

        req.session.userId = user.id;


        return {user};
    }
}
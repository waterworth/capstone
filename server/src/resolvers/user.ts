import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from 'argon2';
import {EntityManager} from '@mikro-orm/postgresql';
import { COOKIE__NAME } from "../constants";
import { UsernamePasswordInput } from "../util/UsernamePasswordInput";
import { validateRegister } from "../util/validateRegister";

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

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() {em}: MyContext
    ){
        return true;
        // const user = await em.findOne(User, {email})
    }


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

        const response = validateRegister(options);
        if(response){
            return response;
        } 

        const hasedPassword = await argon2.hash(options.password)
        let user;
        try{
            const result = await (em as EntityManager).createQueryBuilder(User).getKnexQuery().insert(
                {username: options.username, password: hasedPassword, email: options.email, created_at: new Date(), updated_at: new Date()}
            ).returning('*')
            user = result[0];
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
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() {em, req}: MyContext 
    ) : Promise<UserResponse>{
        const user = await em.findOne(User, usernameOrEmail.includes('@') ? {email: usernameOrEmail} : {username: usernameOrEmail})
        if(!user){
            return {
                errors: [{
                    field: "usernameOrEmail",
                    message: "Username not found."
                 }]
            }
        }
        const valid = await argon2.verify(user.password, password)
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

    @Mutation(()=> Boolean)
    logout(@Ctx() {req, res}: MyContext){
       return new Promise(resolve =>  req.session.destroy(err =>{
           res.clearCookie(COOKIE__NAME)
           if(err){
               console.log(err);
               resolve(false)
               return
           }
           resolve(true);
       })
       )}
}
import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from 'argon2';
import {EntityManager} from '@mikro-orm/postgresql';
import { COOKIE__NAME, FORGET__PASSWORD__PREFIX } from "../constants";
import { UsernamePasswordInput } from "../util/UsernamePasswordInput";
import { validateRegister } from "../util/validateRegister";
import { sendEmail } from "../util/sendEmail";
import {v4 as uuid} from "uuid";


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
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() {redis, em, req}: MyContext
    ): Promise<UserResponse>{
        if (newPassword.length <= 5) {
            return { errors: [
              {
                field: 'newPassword',
                message: 'Password must be longer than 8 characters.',
              },
            ],
          }
        }
        const key = FORGET__PASSWORD__PREFIX+token
        const userId = await redis.get(key)
        if(!userId){
            return { errors: [
                {
                  field: 'token',
                  message: 'Token is expired',
                },
              ],
            }
        }
        
        
        const userIdNum = parseInt(userId)
        const user = await em.findOne(User, {id: userIdNum})


        if(!user){
            return { errors: [
                {
                  field: 'token',
                  message: 'User does not exist',
                },
              ],
            }
        }

        user.password = await argon2.hash(newPassword)
        await em.persistAndFlush(user)

        await redis.del(key)
        // Login user after changed password
        req.session.userId = user.id


        return {user};
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() {em, redis}: MyContext
    ){
        const user = await em.findOne(User, {email})
        if(!user){
            return true;
        }

        const token = uuid();

        await redis.set(FORGET__PASSWORD__PREFIX + token, user.id, 'ex', 1000*60*60*3) // Expire password change in 3 hours

        await sendEmail(email, `<a href="http:localhost:3000/change-password/${token}">Reset Password</a>`)
        return true;
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
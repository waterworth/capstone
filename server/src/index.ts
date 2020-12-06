import { MikroORM } from "@mikro-orm/core";
import 'reflect-metadata';
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { MeetingResolver } from "./resolvers/meeting";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from "./types";




const main = async ()  => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    
    const app = express();

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient();

    app.use(
        session({
            name: 'qid',
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 2, //2 days,
                httpOnly: true,
                sameSite: 'lax', // Protect csrf
                secure: __prod__ // cookie only works in HTTPS
            },
            secret: 'qweqweqweqwe',
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, MeetingResolver, UserResolver],
            validate: false,
        }),
        context: ({req, res}): MyContext => ({ em: orm.em, req, res })
    });

    apolloServer.applyMiddleware({app});

    app.listen(8080, ()=>{
        console.log('Server started on localhost:8080');
    })
}

main().catch(err => {
    console.error(err);
});

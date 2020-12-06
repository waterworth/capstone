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


const main = async ()  => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();
    
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, MeetingResolver, UserResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    });

    apolloServer.applyMiddleware({app});

    app.listen(8080, ()=>{
        console.log('Server started on localhost:8080');
    })
}

main().catch(err => {
    console.error(err);
});

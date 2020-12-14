import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection, getConnection } from 'typeorm';
import { COOKIE__NAME, __prod__ } from './constants';
import { Meeting } from './entities/Meeting';
import { User } from './entities/User';
import { HelloResolver } from './resolvers/hello';
import { MeetingResolver } from './resolvers/meeting';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';
import path from 'path';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: 'capstone2',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Meeting, User],
  });

  // await Meeting.delete({});

  

  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );


  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE__NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2, //2 days,
        httpOnly: true,
        sameSite: 'lax', // Protect csrf
        secure: __prod__, // cookie only works in HTTPS
      },
      secret: 'qweqweqweqwe',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, MeetingResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(8080, () => {
    console.log('Server started on localhost:8080');
  });
};

main().catch((err) => {
  console.error(err);
});

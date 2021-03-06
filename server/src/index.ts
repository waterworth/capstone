import { ApolloServer } from 'apollo-server-express';
import 'dotenv-safe/config';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE__NAME, __prod__ } from './constants';
import { Meeting } from './entities/Meeting';
import { MeetingUser } from './entities/MeetingUser';
import { User } from './entities/User';
import { MeetingResolver } from './resolvers/meeting';
import { UserResolver } from './resolvers/user';
import { createHostLoader } from './util/createHostLoader';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Meeting, User, MeetingUser],
  });
  // await conn.runMigrations();

  const app = express();
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

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
        //domain: __prod__ ? ".masonwaterworth.com" : undefined
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MeetingResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createHostLoader(),
      // userLoader: createUserLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT), () => {
    console.log('Server started on localhost:', process.env.PORT);
  });
};

main().catch((err) => {
  console.error(err);
});

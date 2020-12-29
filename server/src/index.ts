import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import { makeSchema } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import path from 'path';
import { COOKIE__NAME, __prod__ } from './constants';
import * as types from './types';

const prisma = new PrismaClient();

const app = express();
app.set('trust proxy', 1);
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

const apollo = new ApolloServer({
  context: ({ req, res }) => ({ req, res, redis, prisma }),
  schema: makeSchema({
    sourceTypes: {
      modules: [
        {
          module: '.prisma/client',
          alias: 'prismaClient',
        },
      ],
    },
    contextType: {
      module: path.join(__dirname, 'context.js'),
      export: 'Context',
    },
    outputs: {
      typegen: path.join(__dirname, '/nexus-typegen.js'),
      schema: path.join(__dirname, '/schema.graphql'),
    },
    types,
    plugins: [
      nexusPrisma({
        experimentalCRUD: true,
      }),
    ],
  }),
});

apollo.applyMiddleware({ app, cors: false });

app.listen(8080, () => {
  console.log(`🚀 GraphQL service ready at http://localhost:8080/graphql`);
});

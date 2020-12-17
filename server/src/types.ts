import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createHostLoader } from './util/createHostLoader';
import { createUserLoader } from './util/createUserLoader';

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  hostLoader: ReturnType<typeof createHostLoader>;
  userLoader: ReturnType<typeof createUserLoader>;
};

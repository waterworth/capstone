import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createHostLoader } from './util/createHostLoader';

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  hostLoader: ReturnType<typeof createHostLoader>;
};

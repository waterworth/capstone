import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  prisma: PrismaClient;
};

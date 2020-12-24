import argon2 from 'argon2';
import { DateTimeResolver } from 'graphql-scalars';
import {
  arg,
  asNexusMethod,
  booleanArg,
  extendType,
  intArg,
  mutationField,
  nonNull,
  objectType,
  queryField,
  queryType,
  stringArg,
} from 'nexus';
import { v4 as uuid } from 'uuid';
import { COOKIE__NAME, FORGET__PASSWORD__PREFIX } from './constants';
import { sendEmail } from './util/sendEmail';

export const DateTime = asNexusMethod(DateTimeResolver, 'datetime');
const dateArg = () => arg({ type: 'DateTime' });

// User Object Type

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('username', {
      resolve(parent) {
        return parent.username;
      },
    });
    t.string('email', {
      resolve(parent) {
        return parent.email;
      },
    });
    t.boolean('isAdmin', {
      resolve(parent) {
        return parent.isAdmin;
      },
    });
    t.list.field('hosting', {
      type: 'Meeting',
      resolve(root, _args, ctx) {
        return ctx.prisma.meeting.findMany({
          where: {
            hostId: root.id,
          },
        });
      },
    });
    t.list.field('meetings', {
      type: 'Meeting',
      resolve(root, _args, ctx) {
        return ctx.prisma.usersInMeeting.findMany({
          where: {
            user: {
              id: root.id,
            },
          },
        });
      },
    });
  },
});

// Profile Object Type

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.id('id');
    t.int('userId', {
      resolve(parent) {
        return parent.userId;
      },
    });
    t.string('picture', {
      resolve(parent) {
        return parent.picture;
      },
    });
    t.list.string('availability', {
      resolve(parent) {
        return parent.availability;
      },
    });

    t.field('user', {
      type: 'User',
      resolve(root, _args, ctx) {
        return ctx.prisma.findUnique({
          where: {
            id: root.userId,
          },
        });
      },
    });
  },
});

// Meeting Object Type

export const Meeting = objectType({
  name: 'Meeting',
  definition(t) {
    t.id('id');
    t.string('title', {
      resolve(parent) {
        return parent.title;
      },
    });
    t.string('description', {
      resolve(parent) {
        return parent.description;
      },
    });
    t.int('hostId', {
      resolve(parent) {
        return parent.hostId;
      },
    });
    t.datetime('timeslot', {
      resolve(parent: any) {
        return parent.timeslot;
      },
    });
    t.int('length', {
      resolve(parent) {
        return parent.length;
      },
    });
    t.field('host', {
      type: 'User',
      resolve(root, _args, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            id: root.hostId,
          },
        });
      },
    });
    t.list.field('users', {
      type: 'User',
      async resolve(root, _args, ctx) {
        const users = await ctx.prisma.usersInMeeting.findMany({
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
          where: {
            meetingId: root.id,
          },
        });
        return users.map((user: any) => {
          return user.user;
        });
      },
    });
  },
});

// UsersInMeeting Object Type

export const UsersInMeeting = objectType({
  name: 'UsersInMeeting',
  definition(t) {
    t.int('userId', {
      resolve(parent) {
        return parent.userId;
      },
    });
    t.int('meetingId', {
      resolve(parent) {
        return parent.userId;
      },
    });
    t.field('user', {
      type: 'User',
      resolve(root, _args, ctx) {
        return ctx.prisma.user.findUnique({
          where: {
            id: root.userId,
          },
        });
      },
    });
    t.field('meeting', {
      type: 'Meeting',
      resolve(root, _args, ctx) {
        return ctx.prisma.meeting.findUnique({
          where: {
            id: root.meetingId,
          },
        });
      },
    });
  },
});

// Mutations

export const createUser = mutationField('createUser', {
  type: 'User',
  args: {
    username: nonNull(stringArg()),
    password: nonNull(stringArg()),
    email: nonNull(stringArg()),
    isAdmin: nonNull(booleanArg()),
  },
  async resolve(_root, args, ctx) {
    const hasedPassword = await argon2.hash(args.password);
    const user = await ctx.prisma.user.create({
      data: {
        username: args.username,
        password: hasedPassword,
        email: args.email,
        isAdmin: args.isAdmin,
      },
    });
    ctx.req.session.userId = user.id;

    return user;
  },
});

export const loginUser = mutationField('login', {
  type: 'User',
  args: {
    usernameOrEmail: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_root, args, ctx) {
    const user = await ctx.prisma.user.findMany({
      where: {
        OR: [
          {
            email: args.usernameOrEmail,
          },
          {
            username: args.usernameOrEmail,
          },
        ],
      },
    });
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'Username not found.',
          },
        ],
      };
    }
    const valid = await argon2.verify(user[0].password, args.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password was incorrect',
          },
        ],
      };
    }
    ctx.req.session.userId = user[0].id;
    return user[0];
  },
});

export const logoutUser = mutationField('logout', {
  type: 'User',
  resolve(_root, _args, ctx) {
    return new Promise((resolve) =>
      ctx.req.session.destroy((err: any) => {
        ctx.res.clearCookie(COOKIE__NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  },
});

// TODO Test with live site
export const changePassword = mutationField('changePassword', {
  type: 'User',
  args: {
    token: nonNull(stringArg()),
    newPassword: nonNull(stringArg()),
  },
  async resolve(_root, args, ctx) {
    const key = FORGET__PASSWORD__PREFIX + args.token;
    const userId = await ctx.redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token is expired',
          },
        ],
      };
    }
    const userIdNum = parseInt(userId);
    const user = ctx.prisma.user.findUnique({
      where: {
        id: userIdNum,
      },
    });

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user does not exist',
          },
        ],
      };
    }

    return ctx.prisma.user.update({
      where: { id: userIdNum },
      data: { password: await argon2.hash(args.newPassword) },
    });
  },
});

export const forgotPassword = mutationField('forgotPassword', {
  type: 'User',
  args: {
    email: nonNull(stringArg()),
  },
  async resolve(_root, args, ctx) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });
    if (!user) {
      return true;
    }
    const token = uuid();

    await ctx.redis.set(
      FORGET__PASSWORD__PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 3
    ); // Expire password change link in 3 hours.

    await sendEmail(
      args.email,
      `<a href="http:localhost:3000/change-password/${token}"> Reset Password </a>`
    ); // TODO Update to live link
    return true;
  },
});

// TODO Investigate sessionID for hosts
// TODO Add users to meeting as well
export const createMeeting = mutationField('createMeeting', {
  type: 'Meeting',
  args: {
    title: nonNull(stringArg()),
    timeslot: nonNull(dateArg()),
    length: nonNull(intArg()),
    description: nonNull(stringArg()),
    hostId: nonNull(intArg()),
  },
  resolve(_root, args, ctx) {
    return ctx.prisma.meeting.create({
      data: {
        title: args.title,
        timeslot: args.timeslot,
        length: args.length,
        description: args.description,
        host: {
          connect: {
            id: args.hostId,
          },
        },
      },
    });
  },
});

export const updateMeeting = mutationField('updateMeeting', {
  type: 'Meeting',
  args: {
    id: nonNull(intArg()),
    title: nonNull(stringArg()),
    timeslot: nonNull(dateArg()),
    length: nonNull(intArg()),
    description: nonNull(stringArg()),
  },
  resolve(_root, args, ctx) {
    return ctx.prisma.meeting.update({
      where: {
        id: args.id,
      },
      data: {
        title: args.title,
        timeslot: args.timeslot,
        length: args.length,
        description: args.description,
      },
    });
  },
});

export const deleteMeeting = mutationField('deleteMeeting', {
  type: 'Meeting',
  args: {
    id: nonNull(intArg()),
  },
  resolve(_root, args, ctx) {
    return ctx.prisma.meeting.delete({
      where: {
        id: args.id,
      },
    });
  },
});

export const addUsersToMeeting = mutationField('addUsersToMeeting', {
  type: 'UsersInMeeting',
  args: {
    userId: nonNull(intArg()),
    meetingId: nonNull(intArg()),
  },
  resolve(_root, args, ctx) {
    return ctx.prisma.usersInMeeting.create({
      data: {
        user: {
          connect: {
            id: args.userId,
          },
        },
        meeting: {
          connect: {
            id: args.meetingId,
          },
        },
      },
    });
  },
});

// Queries

export const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
    t.list.field('meetings', {
      type: 'Meeting',
      resolve(_root, _args, ctx) {
        return ctx.prisma.meeting.findMany();
      },
    });
    t.list.field('usersInMeeting', {
      type: 'UsersInMeeting',
      resolve(_root, _args, ctx) {
        return ctx.prisma.usersInMeeting.findMany();
      },
    });
  },
});

// TODO fix issue with session id not storing
export const meQuery = queryField('me', {
  type: 'User',
  resolve(_root, _args, ctx) {
    console.log(ctx.req.session.userId);
    if (!ctx.req.session.userId) {
      return null;
    }
    return ctx.prisma.user.findUnique({
      where: { id: ctx.req.session.userId },
    });
  },
});

export const userById = queryField('userById', {
  type: 'User',
  args: {
    id: nonNull(intArg()),
  },
  resolve(_root, args, ctx) {
    return ctx.prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const meetingById = queryField('meetingById', {
  type: 'Meeting',
  args: {
    id: nonNull(intArg()),
  },
  resolve(_root, args, ctx) {
    return ctx.prisma.meeting.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

import DataLoader from 'dataloader';
import { User } from '../entities/User';

export const createHostLoader = () =>
  //1
  new DataLoader<number, User>(async (userIds) => {
    // User.findById(1)
    const users = await User.findByIds(userIds as number[]);
    const hostIdToUser: Record<number, User> = {};
    users.forEach((user) => {
      hostIdToUser[user.id] = user;
    });

    const sortedUsers = userIds.map((userId) => hostIdToUser[userId]);
    return sortedUsers;
  });

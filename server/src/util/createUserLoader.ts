// import DataLoader from 'dataloader';
// import { User } from '../entities/User';

// // Keys example
// // [1, 1 ,1 ,1 ]
// // Desired output
// // [User {id: 1, username: "Mason"}, {}, {}]

// // export const createUserLoader = () =>
// //   new DataLoader<number[][], User>(async (userIds) => {
// //     const userIdToUser: Record<number, User> = {};
// //     const users = await User.findByIds([1, 4]).then((result) =>
// //       console.log(result)
// //     );

// //     const sortedUsers = userIds.map((user) => {
// //       const users = User.findByIds(user).then((result) => console.log(result));
// //       userIdToUser[user] = user;
// //       return users;
// //     });
// //     console.log;
// //     return sortedUsers;
// //   });

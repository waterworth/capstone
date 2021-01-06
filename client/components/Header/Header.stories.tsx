// import React, { ComponentProps } from 'react';
// import { Story } from '@storybook/react/types-6-0';
// import Header from './index';
// import { useMeQuery } from '../../generated/graphql';

// export default {
//   title: 'Components/Header',
//   component: Header,
// };

// const Template: Story<ComponentProps<typeof Header>> = (args) => (
//   <Header {...args} />
// );

// export const Primary = Template.bind({});
// Primary.args = {};
// Primary.parameters = {
//   apolloClient: {
//     mocks: [
//       {
//         request: {
//           query: useMeQuery,
//         },
//         result: {
//           data: {
//             viewer: null,
//           },
//         },
//       },
//     ],
//   },
// };

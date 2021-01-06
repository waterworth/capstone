import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Subnav from './index';
import { withNextRouter } from 'storybook-addon-next-router';

export default {
  title: 'Components/Subnav',
  component: Subnav,
};

const Template: Story<ComponentProps<typeof Subnav>> = (args) => (
  <Subnav {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

Primary.parameters = {
  nextRouter: {
    pathname: '/',
  },
};

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Dashboard from './index';

export default {
  title: 'Components/Dashboard',
  component: Dashboard,
};

const Template: Story<ComponentProps<typeof Dashboard>> = (args) => (
  <Dashboard {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Sidebar from './index';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
};

const Template: Story<ComponentProps<typeof Sidebar>> = (args) => (
  <Sidebar {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

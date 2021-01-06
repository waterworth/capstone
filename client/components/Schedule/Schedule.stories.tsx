import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Schedule from './index';

export default {
  title: 'Components/Schedule',
  component: Schedule,
};

const Template: Story<ComponentProps<typeof Schedule>> = (args) => (
  <Schedule {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

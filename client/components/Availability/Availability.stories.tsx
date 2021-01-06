import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Availability from './index';

export default {
  title: 'Components/Availability',
  component: Availability,
};

const Template: Story<ComponentProps<typeof Availability>> = (args) => (
  <Availability {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

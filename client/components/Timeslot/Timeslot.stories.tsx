import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Timeslot from './index';

export default {
  title: 'Components/Timeslot',
  component: Timeslot,
};

const Template: Story<ComponentProps<typeof Timeslot>> = (args) => (
  <Timeslot {...args} />
);
export const Primary = Template.bind({});
Primary.args = {
  timeslot: '9:00AM',
};

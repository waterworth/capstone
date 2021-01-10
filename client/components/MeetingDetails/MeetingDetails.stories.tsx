import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import MeetingDetails from './index';

export default {
  title: 'Components/MeetingDetails',
  component: MeetingDetails,
};

const Template: Story<ComponentProps<typeof MeetingDetails>> = (args) => (
  <MeetingDetails {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

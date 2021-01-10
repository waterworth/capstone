import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import MeetingForm from './index';

export default {
  title: 'Components/MeetingForm',
  component: MeetingForm,
};

const Template: Story<ComponentProps<typeof MeetingForm>> = (args) => (
  <MeetingForm {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

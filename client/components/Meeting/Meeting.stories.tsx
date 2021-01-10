import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Meeting from './index';

export default {
  title: 'Components/Meeting',
  component: Meeting,
};

const Template: Story<ComponentProps<typeof Meeting>> = (args) => (
  <Meeting {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

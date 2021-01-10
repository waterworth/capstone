import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import SelectTime from './index';

export default {
  title: 'Components/SelectTime',
  component: SelectTime,
};

const Template: Story<ComponentProps<typeof SelectTime>> = (args) => (
  <SelectTime {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

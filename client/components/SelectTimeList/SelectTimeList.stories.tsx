import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import SelectTimeList from './index';

export default {
  title: 'Components/SelectTimeList',
  component: SelectTimeList,
};

const Template: Story<ComponentProps<typeof SelectTimeList>> = (args) => (
  <SelectTimeList {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import SelectDetails from './index';

export default {
  title: 'Components/SelectDetails',
  component: SelectDetails,
};

const Template: Story<ComponentProps<typeof SelectDetails>> = (args) => (
  <SelectDetails {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

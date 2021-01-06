import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import AvailabilityTable from './index';

export default {
  title: 'Components/AvailabilityTable',
  component: AvailabilityTable,
};

const Template: Story<ComponentProps<typeof AvailabilityTable>> = (args) => (
  <AvailabilityTable {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

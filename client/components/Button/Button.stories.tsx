import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  /* the args you need here will depend on your component */
};

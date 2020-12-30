import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { LoginForm } from './LoginForm';

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
};

const Template: Story<ComponentProps<typeof LoginForm>> = (args) => (
  <LoginForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  /* the args you need here will depend on your component */
};

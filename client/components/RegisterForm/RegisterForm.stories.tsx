import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { RegisterForm } from './RegisterForm';

export default {
  title: 'Components/RegisterForm',
  component: RegisterForm,
};

const Template: Story<ComponentProps<typeof RegisterForm>> = (args) => (
  <RegisterForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  /* the args you need here will depend on your component */
};

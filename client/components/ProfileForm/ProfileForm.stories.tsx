import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import ProfileForm from './index';
export default {
  title: 'Components/ProfileForm',
  component: ProfileForm,
};

const Template: Story<ComponentProps<typeof ProfileForm>> = (args) => (
  <ProfileForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  /* the args you need here will depend on your component */
};

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { FormInput } from './FormInput';

export default {
  title: 'Components/FormInput',
  component: FormInput,
};

const Template: Story<ComponentProps<typeof FormInput>> = (args) => (
  <FormInput {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  /* the args you need here will depend on your component */
};

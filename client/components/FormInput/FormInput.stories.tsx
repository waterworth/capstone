import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import FormInput from './index';
import { CheckboxInput, TextAreaInput } from './FormInput';

export default {
  title: 'Components/FormInput',
  component: FormInput,
};

const Template: Story<ComponentProps<typeof FormInput>> = (args) => (
  <FormInput {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};

const Template2: Story<ComponentProps<typeof CheckboxInput>> = (args) => (
  <CheckboxInput {...args} />
);

export const Checkbox = Template2.bind({});
Checkbox.args = {};

const Template3: Story<ComponentProps<typeof TextAreaInput>> = (args) => (
  <TextAreaInput {...args} />
);

export const Textarea = Template3.bind({});
Textarea.args = {};

import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

interface FormInputProps {
  [x: string]: any;
  name: string;
}

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const CheckboxItem = styled.div`
  display: flex;
`;

const Input = styled.input`
  display: flex;
  padding: 0 0.5rem;
  border: 1px solid #000;
  border-radius: 0.85rem;
  font-size: 1rem;
  width: 25rem;
  height: 2.5rem;
  margin: 0.5rem 0 1rem 0;
`;

const Label = styled.label`
  margin-top: 2rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding: 0;
`;

const Error = styled.p`
  color: ${(props) => props.theme.colours.red};
`;

export const FormInput = ({ label, ...props }: FormInputProps) => {
  const [field, meta] = useField(props);
  return (
    <InputItem>
      <Label htmlFor={props.name}>{label}</Label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </InputItem>
  );
};

export const CheckboxInput = ({ label, ...props }: FormInputProps) => {
  const [field, meta] = useField(props);
  return (
    <CheckboxItem>
      <Input {...field} {...props} />
      <Label htmlFor={props.name}>{label}</Label>
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </CheckboxItem>
  );
};

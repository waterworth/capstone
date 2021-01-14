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
  padding: 1rem 3rem;
  width: 100%;
`;
const CheckboxItem = styled.div`
  display: flex;
`;
const TextAreaItem = styled.div`
  padding: 1rem 3rem;
`;

const Input = styled.input`
  display: flex;
  padding: 0 0.5rem;
  border: 1px solid #000;
  border-radius: 0.85rem;
  font-size: 1rem;
  width: 100%;
  height: 2.5rem;
  margin: 0.5rem 0 1rem 0;
`;

const TextArea = styled.textarea`
  display: flex;
  resize: none;
  padding: 0 0.5rem;
  border: 1px solid #000;
  border-radius: 0.85rem;
  font-size: 1rem;
  width: 25rem;
  height: 10rem;
  margin: 0.5rem 0 1rem 0;
`;

const Label = styled.label`
  margin-top: 2rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  padding: 0;
  font-weight: 600;
`;

const Error = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
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

export const TextAreaInput = ({ label, ...props }: FormInputProps) => {
  const [field, meta] = useField(props);
  return (
    <TextAreaItem>
      <Label htmlFor={props.name}>{label}</Label>
      <TextArea {...field} {...props} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </TextAreaItem>
  );
};

import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

interface FormInputProps {
  [x: string]: any;
  name: string;
}

const Input = styled.input`
  display: flex;
  padding: 0 0.5rem;
  border: 1px solid #000;
  border-radius: 0.85rem;
  font-size: 1rem;
  width: 20rem;
  height: 2.5rem;
  margin: 0.5rem 0 1rem 0;
`;

const Label = styled.label`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding: 0;
`;

export const FormInput = ({ label, ...props }: FormInputProps) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <Label>
        {label}
        <Input {...field} {...props} />
      </Label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  );
};

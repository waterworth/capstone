import { Formik, Form, FormikProps, Field } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { FormInput } from '../FormInput/FormInput';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

interface RegisterFormProps {}

const InputWrapper = styled.div`
  display: flex;
  width: 30rem;
  gap: 2rem;
`;
const ButtonWrapper = styled.div`
  margin-left: 7rem;
`;

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const router = useRouter();
  const [registerMutation] = useRegisterMutation({});

  const initialValues = {
    username: '',
    password: '',
    email: '',
    isAdmin: false,
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username is Required'),

    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Password is Required'),

    email: Yup.string().email().required('Email is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        actions.setSubmitting(true);

        const response = await registerMutation({
          variables: {
            username: values.username,
            email: values.email,
            password: values.password,
          },
        });
        if (response.data?.createUser?.username) {
          router.push('/teams');
        }
      }}>
      {(props: FormikProps<any>) => (
        <Form>
          <InputWrapper>
            <FormInput
              name='username'
              label='Username'
              placeholder='Username'
            />
          </InputWrapper>
          <InputWrapper>
            <FormInput
              name='email'
              type='email'
              label='Email'
              placeholder='Email'
            />
          </InputWrapper>
          <InputWrapper>
            <FormInput
              name='password'
              type='password'
              label='Password'
              placeholder='Password'
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button content='Register' />
          </ButtonWrapper>
        </Form>
      )}
    </Formik>
  );
};

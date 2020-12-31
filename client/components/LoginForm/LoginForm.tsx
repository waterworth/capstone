// TODO Continue fixing this page
// Add queries and functionality

import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import CenteredButton from '../Button';
import Divider from '../Divider';
import { FormInput } from '../FormInput/FormInput';
interface LoginFormProps {}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 40rem;
  margin: 0 auto;
  padding: 3rem 2.5rem;
  border-radius: 39px;
  box-shadow: 0 1px 18px -5px rgba(35, 33, 33, 0.25);
  background-color: #ffffff;
`;
const Heading = styled.h1`
  display: flex;
  align-items: left;
`;

const initialValues = {
  usernameOrEmail: '',
  password: '',
};

const SignupSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  return (
    <LoginWrapper>
      <Heading>Sign In</Heading>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          console.log(values);
          actions.setSubmitting(true);
        }}>
        {(props: FormikProps<any>) => (
          <Form>
            <FormInput
              name='usernameOrEmail'
              type='username'
              label='Username or Email'
              placeholder='Username or Email'
            />
            <FormInput
              name='password'
              type='password'
              label='Password'
              placeholder='Password'
            />
          </Form>
        )}
      </Formik>
      <Divider />
      <CenteredButton content='Sign in' />
      {/* <Link href='/forgot-password'>Forgot Password?</Link> */}
    </LoginWrapper>
  );
};

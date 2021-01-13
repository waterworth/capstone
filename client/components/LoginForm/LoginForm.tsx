// TODO UPDATE CACHE

import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import CenteredButton from '../Button';
import Divider from '../Divider';
import { FormInput } from '../FormInput/FormInput';
import { useLoginMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
interface LoginFormProps {}

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
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
  const router = useRouter();
  const [loginMutation, { loading, error, data }] = useLoginMutation();
  return (
    <Wrapper>
      <FormWrapper>
        <Heading>Sign In</Heading>
        <Divider />
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            const response = await loginMutation({
              variables: {
                usernameOrEmail: values.usernameOrEmail,
                password: values.password,
              },
            });
            if (response.data?.login) {
              if (typeof router.query.next === 'string') {
                router.push(router.query.next);
              } else {
                router.push('/');
              }
            }
            console.log(values);
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
              <Divider />
              <CenteredButton content='Sign in' type='submit' />
            </Form>
          )}
        </Formik>
        {/* <Link href='/forgot-password'>Forgot Password?</Link> */}
      </FormWrapper>
    </Wrapper>
  );
};

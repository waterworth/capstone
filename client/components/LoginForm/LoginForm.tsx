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
import Link from 'next/link';
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
  height: auto;
  margin: 3rem 2.5rem;
  border-radius: 39px;
  box-shadow: 0 1px 18px -5px rgba(35, 33, 33, 0.25);
  background-color: #ffffff;
`;
const Heading = styled.h1`
  display: flex;
  align-items: left;
  padding: 3.5rem 3rem 1.5rem 3rem;
  font-weight: 700;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.colours['grey-dark2']};
  font-size: 1.4rem;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  &:hover {
    color: ${(props) => props.theme.colours.green};
  }
  &:last-of-type {
    padding-bottom: 2rem;
  }
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
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Inter', sans-serif;
            width: 100vw;
          }
          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
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

        <Link href='/forgot-password' passHref>
          <StyledLink>Forgot Password?</StyledLink>
        </Link>
        <Link href='/register' passHref>
          <StyledLink>Not already registed? Sign up now!</StyledLink>
        </Link>
      </FormWrapper>
    </Wrapper>
  );
};

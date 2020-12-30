import { Formik, Form, FormikProps } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { FormInput } from '../FormInput/FormInput';

interface RegisterFormProps {}

const InputWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        email: '',
        isAdmin: false,
      }}
      //validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        console.log('Submitted');
        // actions.setSubmitting(true);
        // const response = await register({ variables: { options: values } });
        // if (response.data?.register.errors) {
        //   // console.log(toErrorMap(response.data.register.errors));
        // } else if (response.data?.register.user) {
        //   //router.push('/');
        // }
      }}>
      {(props: FormikProps<any>) => (
        <Form>
          <FormInput name='username' label='Username' placeholder='Username' />

          <InputWrapper>
            <FormInput
              name='username'
              type='email'
              label='Email'
              placeholder='Email'
            />
            <FormInput
              name='username'
              type='email'
              label='Confirm Email'
              placeholder='Email'
            />
          </InputWrapper>
          <InputWrapper>
            <FormInput
              name='username'
              type='password'
              label='Password'
              placeholder='Password'
            />
            <FormInput
              name='username'
              type='password'
              label='Confirm Password'
              placeholder='Password'
            />
          </InputWrapper>
          <button type='submit'>Register</button>
        </Form>
      )}
    </Formik>
  );
};

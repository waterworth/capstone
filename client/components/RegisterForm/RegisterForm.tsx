import { Formik, Form, FormikProps, Field } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { CheckboxInput, FormInput } from '../FormInput/FormInput';
import * as Yup from 'yup';

interface RegisterFormProps {}

const InputWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const [toggle, setToggle] = useState(false);

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

    toggle: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        actions.setSubmitting(true);

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
          <CheckboxInput
            name='toggle'
            type='checkbox'
            label='I agree to the Terms & Privacy Policy'
          />
          <Button content='Register' />
        </Form>
      )}
    </Formik>
  );
};

import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../util/createUrqlClient';
import Link from 'next/link';

interface LoginProps {}

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

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            console.log(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
          }
        }}>
        {({ errors, touched }) => (
          <Form>
            <label htmlFor='username'>Username:</label>
            <Field name='usernameOrEmail' placeholder='Username or Email' />

            {errors.usernameOrEmail && touched.usernameOrEmail ? (
              <div>{errors.usernameOrEmail}</div>
            ) : null}

            <label htmlFor='password'>Password:</label>
            <Field name='password' placeholder='Password' type='password' />

            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <button type='submit'>Login</button>
            <Link href='/forgot-password'>Forgot Password?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Login);

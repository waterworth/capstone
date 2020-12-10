import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { toErrorMap } from '../util/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../util/createUrqlClient';

interface RegisterProps {}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  email: Yup.string().email(),
});

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          isAdmin: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const response = await register({ options: values });
          console.log(values);
          if (response.data?.register.errors) {
            console.log(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
        }}>
        {({ errors, touched }) => (
          <Form>
            <label htmlFor='username'>Username:</label>
            <Field name='username' placeholder='Username' />

            {errors.username && touched.username ? (
              <div>{errors.username}</div>
            ) : null}

            <label htmlFor='password'>Password:</label>
            <Field name='password' placeholder='Password' type='password' />

            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <label htmlFor='email'>Email:</label>
            <Field name='email' placeholder='email' />

            {errors.password && touched.password ? (
              <div>{errors.email}</div>
            ) : null}

            <button type='submit'>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Register);

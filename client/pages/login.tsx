import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../generated/graphql';
import {useRouter} from 'next/router';
import { toErrorMap } from '../util/toErrorMap';

interface LoginProps {}



const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  password: Yup.string()
    .min(2, 'Too Short!')
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
          username: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const response = await login({options: values});
          if(response.data?.login.errors){
            console.log(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user){
            router.push('/')
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

            <button type='submit'>Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

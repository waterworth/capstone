import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <>
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}>
        {complete ? (
          <h3>
            If the email existed on the site, we have sent a link to reset the
            password
          </h3>
        ) : (
          <Form>
            <label htmlFor='email'>Email:</label>
            <Field name='email' placeholder='email' type='email' />
            <button type='submit'>Request New Password</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;

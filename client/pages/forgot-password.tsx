import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import { useForgotPasswordMutation } from '../generated/graphql';
import styles from '../styles/forgot.module.scss';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  return (
    <main className={styles.forgot}>
      <Header title='Forgot Password' />
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}>
        {complete ? (
          <>
            <h3 className={styles.forgot__success}>
              If the email existed on the site, we have sent a link to reset the
              password
            </h3>
            <button
              className={styles.forgot__login}
              onClick={() => router.push('/login')}>
              {' '}
              Login{' '}
            </button>
          </>
        ) : (
          <Form className={styles.forgot__form}>
            <label className={styles.forgot__label} htmlFor='email'>
              Email
            </label>
            <Field
              className={styles.forgot__input}
              name='email'
              placeholder='Email'
              type='email'
            />
            <button className={styles.forgot__button} type='submit'>
              Request New Password
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default ForgotPassword;

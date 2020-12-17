import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';
import Header from '../components/Header/Header';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import styles from '../styles/register.module.scss';

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
  const [register] = useRegisterMutation();
  return (
    <main className={styles.register}>
      <Header title='Register' />
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          isAdmin: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const response = await register({ variables: { options: values } });
          console.log(values);
          if (response.data?.register.errors) {
            console.log(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
        }}>
        {({ errors, touched }) => (
          <Form className={styles.register__form}>
            <label className={styles.register__label} htmlFor='username'>
              Username
            </label>
            <Field
              className={styles.register__input}
              name='username'
              placeholder='Username'
            />

            {errors.username && touched.username ? (
              <p className={styles.register__error}>{errors.username}</p>
            ) : null}

            <label className={styles.register__label} htmlFor='password'>
              Password
            </label>
            <Field
              className={styles.register__input}
              name='password'
              placeholder='Password'
              type='password'
            />

            {errors.password && touched.password ? (
              <p className={styles.register__error}>{errors.password}</p>
            ) : null}

            <label className={styles.register__label} htmlFor='email'>
              Email
            </label>
            <Field
              className={styles.register__input}
              name='email'
              placeholder='Email'
            />

            {errors.password && touched.password ? (
              <p className={styles.register__error}>{errors.email}</p>
            ) : null}

            <button className={styles.register__button} type='submit'>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default Register;

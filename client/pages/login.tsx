import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { useLoginMutation } from '../generated/graphql';

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const apolloClient = useApolloClient();
  return (
    <LoginForm />
    // <div className={styles.login}>
    //   <Header title='Login' />
    //   <Formik
    //     initialValues={{
    //       usernameOrEmail: '',
    //       password: '',
    //     }}
    //     validationSchema={SignupSchema}
    //     onSubmit={async (values) => {
    //       const response = await login({ variables: values });
    //       if (response.data?.login.errors) {
    //       } else if (response.data?.login.user) {
    //         if (typeof router.query.next === 'string') {
    //           router.push(router.query.next);
    //         } else {
    //           await apolloClient.resetStore();
    //           router.push('/');
    //         }
    //       }
    //     }}>
    //     {({ errors, touched }) => (
    //       <Form className={styles.login__form}>
    //         <label className={styles.login__label} htmlFor='username'>
    //           Username
    //         </label>
    //         <Field
    //           className={styles.login__input}
    //           name='usernameOrEmail'
    //           placeholder='Username or Email'
    //         />

    //         {errors.usernameOrEmail && touched.usernameOrEmail ? (
    //           <p className={styles.login__error}>{errors.usernameOrEmail}</p>
    //         ) : null}

    //         <label className={styles.login__label} htmlFor='password'>
    //           Password
    //         </label>
    //         <Field
    //           className={styles.login__input}
    //           name='password'
    //           placeholder='Password'
    //           type='password'
    //         />

    //         {errors.password && touched.password ? (
    //           <p className={styles.login__error}>{errors.password}</p>
    //         ) : null}

    //         <button className={styles.login__button} type='submit'>
    //           Login
    //         </button>
    //         <Link href='/forgot-password'>
    //           <a className={styles.login__link}>Forgot password?</a>
    //         </Link>
    //       </Form>
    //     )}
    //   </Formik>
    // </div>
  );
};

export default Login;

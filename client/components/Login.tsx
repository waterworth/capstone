import Link from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../util/isServer';
import { useRouter } from 'next/router';

interface LoginProps {}

const Login = ({}) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;

  //loading
  if (loading) {
    // not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Link href='/login'>
          <a href=''>Login</a>
        </Link>
        <Link href='/register'>Register</Link>
      </>
    );
    // is logged in
  } else {
    body = (
      <>
        <h1>Welcome {data.me.username}</h1>
        <button
          onClick={async () => {
            await logout();
            router.reload();
          }}>
          {' '}
          Logout
        </button>
      </>
    );
  }

  return <>{body}</>;
};

export default Login;

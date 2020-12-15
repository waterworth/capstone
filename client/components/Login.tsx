import Link from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../util/isServer';

interface LoginProps {}

const Login = ({}) => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  //loading
  if (fetching) {
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
          onClick={() => {
            logout();
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

import React from 'react';
import Link from 'next/link';
import { useLoginMutation, useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
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
      )
  // is logged in
  } else {
      body = (
        <>
          <h1>Welcome {data.me.username}</h1>
          <button onClick={() => { logout()}}> Logout</button>
          </>
      )
  }

  return (
    <>
      {body}
    </>
  );
};

export default Nav;

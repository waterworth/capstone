import React from 'react';
import styled from 'styled-components';
import Header from '../Header/';
import Subnav from '../Subnav/';
import Schedule from '../Schedule/';
import { useMeQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';
import Login from '../Login';

export const Dashboard = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  let body = null;

  if (loading) {
    return null;
  } else if (!data?.me) {
    body = <Login />;
  } else
    body = (
      <main>
        <Header title='Dashboard' />
        <Subnav />
        <Schedule />
      </main>
    );

  return <>{body}</>;
};

// .dashboard
// width: 100%;
//   height: 100vh;
//   overflow: scroll;

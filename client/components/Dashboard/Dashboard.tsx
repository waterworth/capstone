import React from 'react';
import styled from 'styled-components';
import Header from '../Header/';
import Subnav from '../Subnav/';
import Schedule from '../Schedule/';
import { useMeQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';
import Login from '../Login';
import Layout from '../Layout';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Dashboard = (props: any) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  let body = null;

  if (loading) {
    return null;
  } else if (!data?.me) {
    body = <Login />;
  } else
    body = (
      <Layout>
        <Wrapper>
          <Header title='Dashboard' />
          <Subnav />
          <Schedule />
        </Wrapper>
      </Layout>
    );

  return <>{body}</>;
};

// .dashboard
// width: 100%;
//   height: 100vh;
//   overflow: scroll;

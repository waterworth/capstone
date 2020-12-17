import React from 'react';
import Header from '../Header/Header';
import styles from './Dashboard.module.scss';
import { Subnav } from '../Subnav/Subnav';
import Schedule from '../Schedule/Schedule';
import { useMeQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';
import Login from '../Login';

const Dashboard = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  let body = null;

  if (loading) {
    return null;
  } else if (!data?.me) {
    body = <Login />;
  } else
    body = (
      <main className={styles.dashboard}>
        <Header title='Dashboard' />
        <Subnav />
        <Schedule />
      </main>
    );

  return <>{body}</>;
};

export default Dashboard;

import React from 'react';
import { useMeetingsQuery, useMeQuery } from '../generated/graphql';
import Dashboard from '../components/Dashboard/';
import { useRouter } from 'next/router';
import Login from '../components/Login';

const Index = () => {
  const router = useRouter();
  const { data } = useMeetingsQuery();
  const { data: medata } = useMeQuery();
  return <>{!medata ? <Login /> : <Dashboard />}</>;
};

export default Index;

import React from 'react';
import { useMeetingsQuery, useMeQuery } from '../generated/graphql';
import Dashboard from '../components/Dashboard/';
import { useRouter } from 'next/router';
import Login from '../components/Login';

const Index = () => {
  const router = useRouter();
  const { data: medata } = useMeQuery();
  return (
    <>
      <Dashboard />
    </>
  );
};

export default Index;

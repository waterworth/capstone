// TODO  Add logo

import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { useLoginMutation } from '../generated/graphql';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return <LoginForm />;
};

export default Login;

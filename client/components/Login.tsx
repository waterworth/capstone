import { useApolloClient } from '@apollo/client';
import React from 'react';
import LoginForm from './LoginForm';

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const apolloClient = useApolloClient();
  return <LoginForm />;
};

export default Login;

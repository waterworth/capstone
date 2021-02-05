import { Router, useRouter } from 'next/router';
import React from 'react';
import { useLogoutMutation } from '../../generated/graphql';
import Button from '../Button';

interface LogoutButtonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation({});
  return (
    <Button
      content='Logout'
      onClick={async (e) => {
        const response = await logoutMutation();
        console.log(response);
        if (response.data?.logout) {
          router.push('/');
          console;
        }
      }}
    />
  );
};

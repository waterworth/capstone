import { Router, useRouter } from 'next/router';
import React from 'react';
import { useLogoutMutation } from '../../generated/graphql';

import styled from 'styled-components';
import { CenteredButton } from '../Button/Button';

interface LogoutButtonProps {}

const Logout = styled(CenteredButton)`
  margin-left: 3rem;
`;

export const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation({});
  return (
    <Logout
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

// TODO add icons
// add active toggle on click

import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { LogoutButton } from '../LogoutButton/LogoutButton';

interface SidebarProps {}

const SidebarWrapper = styled.div`
  z-index: 2;
  background-color: $cloud;
  width: 21.25rem;
  height: 100vh;
  box-sizing: border-box;
  box-shadow: 0 1px 18px -5px rgba(35, 33, 33, 0.25);
  margin-right: 3rem;
`;

const Header = styled.div`
  padding: 4rem 3rem;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colours.black};
`;

const Divider = styled.div`
  width: 1px;
  height: 3rem;
  margin-right: 0.75rem;
  background-color: ${(props) => props.theme.colours['grey-dark2']};
`;

const Img = styled.img`
  margin-right: 0.75rem;
  border-radius: 0.4rem;
`;

const Info = styled.div`
  display: flex;
  height: 3rem;
  flex-direction: column;
  justify-content: space-around;
  h2,
  p {
    padding: 0;
    margin: 0;
  }
`;

const UserName = styled.p`
  font-size: 0.825rem;
  font-weight: 400;
`;
const UserRole = styled.p`
  font-size: 0.75rem;
`;

const Nav = styled.div``;
const Menu = styled.nav`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Option = styled.li`
  padding: 2rem 3rem;
  &:hover {
    color: ${(props) => props.theme.colours['lightblue-dark2']};
    background-color: ${(props) => props.theme.colours['grey-light2']};
  }
`;

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const apolloClient = useApolloClient();
  const { data, loading, error } = useMeQuery();
  return (
    <SidebarWrapper>
      <Header>
        <Link href='/'>
          <Img src='https://via.placeholder.com/46' alt='teamlogo' />
        </Link>
        <Divider> </Divider>
        <Img src='https://via.placeholder.com/46' alt='userImage' />
        <Info>
          <UserName>{data?.me?.username}</UserName>
          <UserRole>{data?.me?.isAdmin ? 'Administrator' : 'User'}</UserRole>
          {/* Investigate ^ this */}
        </Info>
      </Header>
      <Nav>
        <Menu>
          <Option>Dashboard</Option>
          <Option>Inbox</Option>
          <Option>Calendar</Option>
          <Option>Meetings</Option>
        </Menu>
      </Nav>
      <LogoutButton />
    </SidebarWrapper>
  );
};

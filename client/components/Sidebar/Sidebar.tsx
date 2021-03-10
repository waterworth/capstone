// TODO add icons
// add active toggle on click

import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { LogoutButton } from '../LogoutButton/LogoutButton';

interface SidebarProps {}

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 46px;
  width: 46px;
  object-fit: cover;
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

const UserName = styled.a`
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
  const { data } = useMeQuery();
  return (
    <SidebarWrapper>
      <Header>
        {/* Incorporate team data */}
        <Link href='/'>
          <Img src='https://via.placeholder.com/46' alt='teamlogo' />
        </Link>
        <Divider> </Divider>
        <Img src={data?.me?.profile?.picture} alt='userImage' />
        <Info>
          <UserName href='/profile/${...data?.me?.id}'>
            {data?.me?.username}
          </UserName>

          {/* Incorporate team data  */}
          <UserRole>{data?.me ? 'Administrator' : 'User'}</UserRole>
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

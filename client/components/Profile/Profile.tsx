import React, { useState } from 'react';
import Header from '../Header';
import Layout from '../Layout';
import ProfileForm from '../ProfileForm';
import Subnav from '../Subnav';
import styled from 'styled-components';
import Availability from '../Availability';

interface ProfileProps {}

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  overflow: scroll;
`;

export const ProfilePage: React.FC<ProfileProps> = ({}) => {
  const [options] = useState(['Details', 'Availability']);
  const [view] = useState('details');

  return (
    <Layout>
      <ProfileWrapper>
        <Header title='Profile'></Header>
        <Subnav options={options}></Subnav>
        <ProfileForm />
      </ProfileWrapper>
    </Layout>
  );
};

// TODO clean up styling
// Add functionality with Me query
// Update subnav with Details / Availibility

import React from 'react';
import Header from '../../components/Header/Header';
import { Subnav } from '../../components/Subnav/Subnav';
import ProfileForm from '../../components/ProfileForm/';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  return (
    <>
      <Header title='Profile' />
      <Subnav />
      <ProfileForm />
    </>
  );
};

export default Profile;

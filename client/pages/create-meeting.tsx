import { useApolloClient } from '@apollo/client';
import * as moment from 'moment';
import styled from 'styled-components';
import React from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import MeetingForm from '../components/MeetingForm';
import { useIsAuth } from '../util/useIsAuth';
import OldMeeting from '../components/OldMeeting/OldMeeting';

interface MomentString {
  format: typeof moment;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: -3rem;
`;

const CreateMeeting: React.FC<{}> = ({}) => {
  const apolloClient = useApolloClient();
  return (
    <Layout>
      <Wrapper>
        <Header title='New Meeting' />
        <MeetingForm />
        {/* <OldMeeting /> */}
      </Wrapper>
    </Layout>
  );
};

export default CreateMeeting;

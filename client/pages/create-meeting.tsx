import { useApolloClient } from '@apollo/client';
import * as moment from 'moment';
import React from 'react';
import { useIsAuth } from '../util/useIsAuth';

interface MomentString {
  format: typeof moment;
}

const CreateMeeting: React.FC<{}> = ({}) => {
  const apolloClient = useApolloClient();
  return <h1>Hello</h1>;
};

export default CreateMeeting;

import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../util/createUrqlClient';
import { useMeetingsQuery } from '../generated/graphql';
import Dashboard from '../components/Dashboard/Dashboard';

const Index = () => {
  const { data } = useMeetingsQuery();
  return (
    <>
      <Dashboard />

      {/* <Login /> */}
      {/* {!data ? (
        <div>Loading...</div>
      ) : (
        data.meetings.map((meeting) => (
          <section key={meeting.id}>
            <h2>{meeting.title}</h2>
            <h3>Meeting is at: {meeting.timeslot}</h3>
            <h3>Length of meeting: {meeting.length} hours</h3>
            <p>Meeting details: {meeting.description}</p>
          </section>
        ))
      )} */}
    </>
  );
};

export default Index;

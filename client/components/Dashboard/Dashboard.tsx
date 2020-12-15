import React from 'react';
import Header from '../Header/Header';

import styles from './Dashboard.module.scss';
import { Subnav } from '../Subnav/Subnav';
import Schedule from '../Schedule/Schedule';

const Dashboard = () => {
  //   const [{ data }] = useMeetingsQuery();
  return (
    <main className={styles.dashboard}>
      <Header />
      <Subnav />

      <Schedule />
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
    </main>
  );
};

export default Dashboard;

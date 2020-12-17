import { withUrqlClient } from 'next-urql';
import React from 'react';
import { useMeetingsQuery, useMeQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../util/createUrqlClient';
import styles from './Schedule.module.scss';

interface ScheduleProps {}

const Schedule: React.FC<ScheduleProps> = ({}) => {
  const { data } = useMeetingsQuery();
  const date = new Date()
    .toString()
    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2, $3');
  return (
    <section className='schedule'>
      <p className={styles.schedule__welcome}>
        Good Morning! Today is {date}. Here is your schedule for today!
      </p>

      <section className={styles.meeting__block_yellow}>
        <h2 className={styles.meeting__title}>Daily Standup</h2>
        <p className={styles.meeting__timeslot}>10:00 - 11:00AM</p>
      </section>

      <section className={styles.meeting__block_blue}>
        <h2 className={styles.meeting__title}>Daily Standup</h2>
        <p className={styles.meeting__timeslot}>10:00 - 11:00AM</p>
      </section>
      <section className={styles.meeting__block_pink}>
        <h2 className={styles.meeting__title}>Daily Standup</h2>
        <p className={styles.meeting__timeslot}>10:00 - 11:00AM</p>
      </section>
      <section className={styles.meeting__block_black}>
        <h2 className={styles.meeting__title}>DO NOT DISTURB</h2>
        <p className={styles.meeting__timeslot}>10:00 - 11:00AM</p>
      </section>
      <section className={styles.meeting__block_red}>
        <h2 className={styles.meeting__title}>Daily Standup</h2>
        <p className={styles.meeting__timeslot}>10:00 - 11:00AM</p>
      </section>

      {/* {!data ? (
        <div> Loading ... </div>
      ) : (
        data.meetings.map((meeting) => (
          <section className={styles.meeting__block} key={meeting.id}>
            <h2>{meeting.title}</h2>
            <h3>
              {meeting.timeslot} + {meeting.length}{' '}
            </h3>
            <p>{meeting.description}</p>
            <p>{meeting.host.username}</p>
          </section>
        ))
      )} */}
    </section>
  );
};

export default Schedule;

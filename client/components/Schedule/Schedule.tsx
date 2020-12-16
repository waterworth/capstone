import { withUrqlClient } from 'next-urql';
import React from 'react';
import { useMeetingsQuery, useMeQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../util/createUrqlClient';
import styles from './Schedule.module.scss';

interface ScheduleProps {}

const Schedule: React.FC<ScheduleProps> = ({}) => {
  const [{ data }] = useMeetingsQuery();

  return (
    <section className='schedule'>
      <div className={styles.schedule__welcome}>
        Good Morning! Here is your schedule for today!
      </div>
      {!data ? (
        <div> Loading ... </div>
      ) : (
        data.meetings.map((meeting) => (
          <section className={styles.meeting__block} key={meeting.id}>
            <h2>{meeting.title}</h2>
            <h3>
              {meeting.timeslot} + {meeting.length}{' '}
            </h3>
            <p>{meeting.description}</p>
            <p>{meeting.users}</p>
          </section>
        ))
      )}
    </section>
  );
};

export default withUrqlClient(createUrqlClient)(Schedule);

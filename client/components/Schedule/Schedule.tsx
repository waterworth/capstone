import Link from 'next/link';
import React, { useState } from 'react';
import { array } from 'yup/lib/locale';
import { useMeetingsQuery } from '../../generated/graphql';
import styles from './Schedule.module.scss';

interface ScheduleProps {}

const Schedule: React.FC<ScheduleProps> = ({}) => {
  const [meetingDetails, setMeetingDetails] = useState();
  const { data, error, loading } = useMeetingsQuery();
  const date = new Date()
    .toString()
    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2, $3');

  return (
    <section
      className={styles.schedule}
      onClick={(e) =>
        meetingDetails !== undefined ? setMeetingDetails(undefined) : null
      }>
      <section>
        <p className={styles.schedule__welcome}>
          Good Morning! Today is {date}. Here are your upcoming events!
        </p>
        {console.log({ data })}
        {!data ? (
          <div> Loading ... </div>
        ) : (
          data.meetings.map((meeting) => (
            <section
              onClick={(e) => setMeetingDetails(meeting)}
              className={styles.meeting__block_blue}
              key={meeting.id}>
              <h2 className={styles.meeting__title}>{meeting.title}</h2>
              <p className={styles.meeting__timeslot}>{meeting.timeslot}</p>
            </section>
          ))
        )}
      </section>
      {meetingDetails ? (
        <aside className={styles.meetingdetails}>
          <h2 className={styles.meetingdetails__title}>
            {meetingDetails.title}
          </h2>

          <section className={styles.meetingdetails__section}>
            <h3 className={styles.meetingdetails__subtitle}>Members</h3>
            <section>
              <img
                className={styles.meetingdetails__image}
                src='https://via.placeholder.com/46'
                alt='user image'
              />
              <img
                className={styles.meetingdetails__image}
                src='https://via.placeholder.com/46'
                alt='user image'
              />
              <img
                className={styles.meetingdetails__image}
                src='https://via.placeholder.com/46'
                alt='user image'
              />
            </section>
          </section>

          <section className={styles.meetingdetails__section}>
            <h3 className={styles.meetingdetails__subtitle}>Time</h3>
            <p className={styles.meetingdetails__text}>
              {meetingDetails.timeslot}
            </p>

            <h3 className={styles.meetingdetails__subtitle}>Length</h3>
            <p className={styles.meetingdetails__text}>
              {meetingDetails.length} hour(s)
            </p>
          </section>

          <section className={styles.meetingdetails__section}>
            <h3 className={styles.meetingdetails__subtitle}>Description</h3>
            <p className={styles.meetingdetails__text}>
              {meetingDetails.description}
            </p>
          </section>

          <section className={styles.meetingdetails__section}>
            <h3 className={styles.meetingdetails__subtitle}>Meeting Link</h3>
            <div className={styles.meetingdetails__linkcontainer}>
              <img
                className={styles.meetingdetails__image}
                src='https://via.placeholder.com/46'
                alt='user image'
              />
              <Link href='/'>
                <a className={styles.meetingdetails__link}>Join the call</a>
              </Link>
            </div>
          </section>
        </aside>
      ) : null}
    </section>
  );
};

export default Schedule;

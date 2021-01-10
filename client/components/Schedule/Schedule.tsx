// TODO Update to use Meeting and MeetingDetails components

import Link from 'next/link';
import React, { useState } from 'react';
import { useMeetingsQuery } from '../../generated/graphql';

interface ScheduleProps {}

interface MeetingData {
  length: number;
  description: string;
  id: number;
  title: string;
  timeslot: string;
}

export const Schedule: React.FC<ScheduleProps> = ({}) => {
  const [meetingDetails, setMeetingDetails] = useState<MeetingData | undefined>(
    undefined
  );
  const { data } = useMeetingsQuery();
  const date = new Date()
    .toString()
    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2, $3');

  return (
    <section
      onClick={(e) =>
        meetingDetails !== undefined ? setMeetingDetails(undefined) : null
      }>
      <section>
        <p>Good Morning! Today is {date}. Here are your upcoming events!</p>
        {!data ? (
          <div> Loading ... </div>
        ) : (
          data.meetings.map((meeting) => (
            <section
              onClick={(e) => setMeetingDetails(meeting)}
              key={meeting.id}>
              <h2>{meeting.title}</h2>
              <p>{meeting.timeslot}</p>
            </section>
          ))
        )}
      </section>
      {meetingDetails ? (
        <aside>
          <h2>{meetingDetails.title}</h2>

          <section>
            <h3>Members</h3>
            <section>
              <img src='https://via.placeholder.com/46' alt='user image' />
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

          <section>
            <h3>Time</h3>
            <p>{meetingDetails.timeslot}</p>

            <h3>Length</h3>
            <p>{meetingDetails.length} hour(s)</p>
          </section>

          <section>
            <h3>Description</h3>
            <p>{meetingDetails.description}</p>
          </section>

          <section>
            <h3>Meeting Link</h3>
            <div>
              <img src='https://via.placeholder.com/46' alt='user image' />
              <Link href='/'>
                <a>Join the call</a>
              </Link>
            </div>
          </section>
        </aside>
      ) : null}
    </section>
  );
};

// .schedule {
//   display: flex;
//   flex-direction: row;
//   &__welcome {
//     margin: 3rem;
//     width: 40rem;
//     font-size: 1.5rem;
//   }
// }

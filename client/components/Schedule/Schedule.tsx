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

// .meeting {
//   &__block {
//     &_red {
//       width: 35rem;
//       margin-left: 3rem;
//       margin-bottom: 5rem;
//       border-radius: 0 1.5rem 1.5rem 0;
//       background-color: $red-light2;
//       border-left: 2.5rem solid $red-dark2;
//     }
//     &_black {
//       color: white;
//       width: 35rem;
//       margin-left: 3rem;
//       margin-bottom: 5rem;
//       border-radius: 0 1.5rem 1.5rem 0;
//       background-color: $black-light2;
//       border-left: 2.5rem solid $black-dark2;
//     }
//     &_blue {
//       width: 35rem;
//       margin-left: 3rem;
//       margin-bottom: 5rem;
//       border-radius: 0 1.5rem 1.5rem 0;
//       background-color: $lightblue-light2;
//       border-left: 2.5rem solid $lightblue-dark2;
//     }
//     &_yellow {
//       width: 35rem;
//       margin-left: 3rem;
//       margin-bottom: 5rem;
//       border-radius: 0 1.5rem 1.5rem 0;
//       background-color: $yellow-light2;
//       border-left: 2.5rem solid $yellow-dark2;
//     }
//     &_pink {
//       width: 35rem;
//       margin-left: 3rem;
//       margin-bottom: 5rem;
//       border-radius: 0 1.5rem 1.5rem 0;
//       background-color: $pink-light2;
//       border-left: 2.5rem solid $pink-dark2;
//     }
//   }
//   &__title {
//     padding: 1.5rem 1.5rem 0.5rem 1.5rem;
//   }
//   &__timeslot {
//     padding: 0 1.5rem 5rem 1.5rem;
//   }
// }

// .meetingdetails {
//   box-shadow: 0 1px 18px -5px rgba(35, 33, 33, 0.25);
//   display: flex;
//   flex-direction: column;
//   flex-grow: 2;
//   margin-right: 3rem;
//   border-top: 0.5rem solid $lightblue-dark2;
//   overflow: scroll;
//   &__title {
//     margin: 0;
//     padding: 2rem;
//     border-bottom: solid 1px $cloud;
//   }
//   &__section {
//     padding: 1rem 2rem;
//     border-bottom: 1px solid $cloud;
//   }
//   &__image {
//     padding-right: 0.5rem;
//   }
//   &__subtitle {
//     font-size: 0.8rem;
//   }
//   &__linkcontainer {
//     display: flex;
//     align-items: center;
//   }
//   &__link {
//     color: $lightblue-dark2;
//   }
// }

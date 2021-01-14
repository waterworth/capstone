import Link from 'next/link';
import React, { useState } from 'react';
import { useMeQuery, useUserByIdQuery } from '../../generated/graphql';
import Meeting from '../Meeting';
import MeetingDetails from '../MeetingDetails';
import styled from 'styled-components';

interface ScheduleProps {}

interface MeetingData {
  length: number;
  description: string;
  id: number;
  title: string;
  timeslot: string;
}

const Wrapper = styled.section`
  display: flex;
`;

export const Schedule: React.FC<ScheduleProps> = ({}) => {
  const [meetingDetails, setMeetingDetails] = useState<MeetingData | undefined>(
    undefined
  );

  const { data: meData } = useMeQuery();
  const userId: any = meData?.me?.id;
  const { data, loading, error } = useUserByIdQuery({
    variables: {
      id: parseInt(userId),
    },
  });

  console.log(meetingDetails);

  const date = new Date()
    .toString()
    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$1 $2, $3');

  return (
    <Wrapper
      onClick={(e) =>
        meetingDetails !== undefined ? setMeetingDetails(undefined) : null
      }>
      <section>
        <p>Good Morning! Today is {date}. Here are your upcoming events!</p>
        {!data ? (
          <h2>Loading...</h2>
        ) : (
          data?.userById?.meetings?.map((meeting) => (
            <section onClick={(e) => setMeetingDetails(meeting)}>
              <Meeting title={meeting?.title} timeslot={meeting?.timeslot} />
            </section>
          ))
        )}
      </section>
      {meetingDetails ? (
        <MeetingDetails
          key={meetingDetails.id}
          title={meetingDetails.title}
          length={meetingDetails.length}
          description={meetingDetails.description}
          timeslot={meetingDetails.timeslot}
        />
      ) : null}
    </Wrapper>
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

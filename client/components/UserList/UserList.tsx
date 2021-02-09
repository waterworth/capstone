// TODO Update the page to rerender / call the meeting by id query on click

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useAddUsersToMeetingMutation,
  useMeetingByIdQuery,
  useRemoveUserFromMeetingMutation,
  useUsersQuery,
} from '../../generated/graphql';

interface UserListProps {
  meetingId: number;
  refetch: any;
}

const Users = styled.ul`
  list-style: none;
  margin: 1rem 3rem;
  padding-left: 0;
`;

const User = styled.li`
  border: 1px solid ${(props) => props.theme.colours['grey-light1']};
  padding: 1rem;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.colours['grey-light1']};
  }
`;

export const UserList: React.FC<UserListProps> = ({ meetingId, refetch }) => {
  const { data } = useUsersQuery();
  const [addUsersToMeetingMutation] = useAddUsersToMeetingMutation({
    variables: {
      userId: 1,
      meetingId: meetingId,
    },
  });

  const [removeUserFromMeetingMutation] = useRemoveUserFromMeetingMutation({});

  // Get this meeting programatically from meeting that was just made.

  const { data: meetingData } = useMeetingByIdQuery({
    variables: {
      id: meetingId,
    },
  });

  return (
    <>
      <Users>
        {data?.users?.map((user) => (
          <User
            onClick={async (e) => {
              // Check if usersinmeeting is empty array.
              // If true, add the user to meeting
              if (meetingData!.meetingById!.users!.length < 1) {
                await addUsersToMeetingMutation({
                  variables: {
                    userId: parseInt(user?.id as string),
                    meetingId,
                  },
                });
                refetch();
              }

              // Check if the user is in the meeting.
              // If so remove the user to the meeting
              const userInMeeting = meetingData!.meetingById!.users;
              if (
                userInMeeting?.some(
                  (userInMeeting) => userInMeeting!.username == user?.username
                )
              ) {
                await removeUserFromMeetingMutation({
                  variables: {
                    userId: parseInt(user?.id as string),
                    meetingId: meetingId,
                  },
                });
                refetch();
              }
              // Add the user to the meeting
              else {
                await addUsersToMeetingMutation({
                  variables: {
                    userId: parseInt(user?.id as string),
                    meetingId: meetingId,
                  },
                });
                refetch();
              }
            }}
            key={user?.id}>
            {user?.username}
          </User>
        ))}
      </Users>
    </>
  );
};

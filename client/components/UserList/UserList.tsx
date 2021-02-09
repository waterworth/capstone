// TODO This is working, but there seems to be an issue with the CRUD
// functionality when removing a user sometimes, Investigate.

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

export const UserList: React.FC<UserListProps> = ({ meetingId }) => {
  const [attendance, setAttendance] = useState([]);
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
              console.log('User List', meetingData!.meetingById!.users!);
              console.log('User map', user);
              await meetingData!.meetingById!.users?.filter(
                async (userInMeeting) => {
                  if (userInMeeting?.username == user?.username) {
                    await removeUserFromMeetingMutation({
                      variables: {
                        userId: parseInt(user?.id as string),
                        meetingId: meetingId,
                      },
                    });
                  } else {
                    await addUsersToMeetingMutation({
                      variables: {
                        userId: parseInt(user?.id as string),
                        meetingId: meetingId,
                      },
                    });
                  }
                }
              );
            }}
            key={user?.id}>
            {user?.username}
          </User>
        ))}
      </Users>
    </>
  );
};

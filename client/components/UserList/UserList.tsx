import React, { useState } from 'react';
import styled from 'styled-components';
import { useUsersQuery } from '../../generated/graphql';

interface UserListProps {}

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

export const UserList: React.FC<UserListProps> = ({}) => {
  const [attendance, setAttendance] = useState([]);
  console.log(attendance);
  const { data, loading, error } = useUsersQuery();
  return (
    <>
      <Users>
        {data?.users?.map((user) => (
          <User
            onClick={(e) => {
              setAttendance([...attendance, user?.username]);
            }}
            key={user?.id}>
            {user?.username}
          </User>
        ))}
      </Users>
    </>
  );
};

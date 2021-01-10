// TODO add functionality to get users in meeting for the details

import React from 'react';
import styled from 'styled-components';

interface SelectDetailsProps {}

export const SelectDetails: React.FC<SelectDetailsProps> = ({}) => {
  return (
    <Wrapper>
      <DetailsItem>
        <h3>Title</h3>
        <p>Meeting Title</p>
      </DetailsItem>
      <DetailsItem>
        <h3>Length</h3>
        <p>x hour(s)</p>
      </DetailsItem>
      <DetailsItem>
        <h3>Description</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla amet
          repellendus eum? Voluptatibus, ea quod.
        </p>
      </DetailsItem>
      <DetailsItem>
        <h3>Participants</h3>
        <UserList>
          <User>User 1</User>
          <User>User 2</User>
          <User>User 3</User>
        </UserList>
        {/* Map of users from query goes here */}
      </DetailsItem>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colours.cloud};
`;

const DetailsItem = styled.section`
  padding-right: 1rem;
  max-width: 20rem;
  &:last-child {
    width: 20rem;
  }
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const User = styled.li`
  display: flex;
  flex-basis: 50%;
`;

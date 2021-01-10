import React from 'react';
import styled from 'styled-components';

interface TimeslotProps {
  timeslot: string;
  //   onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Timeslot: React.FC<TimeslotProps> = (props) => {
  return (
    <TimeslotItem>
      <Selection />
      <Time>{props.timeslot}</Time>
      <Images>
        {/* TODO Break into own component */}
        <img src='https://via.placeholder.com/32' alt='' />
        <img src='https://via.placeholder.com/32' alt='' />
        <img src='https://via.placeholder.com/32' alt='' />
        <img src='https://via.placeholder.com/32' alt='' />
      </Images>
      <Status>All users are free at this time!</Status>
    </TimeslotItem>
  );
};

const TimeslotItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin: 0.5rem 0;
  border-radius: 0.75rem;
  border: 1px solid ${(props) => props.theme.colours.green};
`;

const Selection = styled.div`
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
  border-radius: 0.2rem;
  background-color: ${(props) => props.theme.colours.green};
`;

const Time = styled.p`
  margin-left: 1rem;
  min-width: 5rem;
`;

const Images = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 3rem;
`;

const Status = styled.p`
  margin-left: 2.5rem;
`;

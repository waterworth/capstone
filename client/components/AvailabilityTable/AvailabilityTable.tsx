//TODO complete functionality

import React from 'react';
import styled from 'styled-components';

interface AvailabilityTableProps {}

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const timeslots = [
  '9:00AM',
  '10:00AM',
  '11:00AM',
  '12:00PM',
  '1:00PM',
  '2:00PM',
  '3:00PM',
  '4:00PM',
  '5:00PM',
];

const Week = ({}) => {
  return (
    <Wrapper>
      {days.map((day) => {
        return (
          <Day key={day}>
            <Header>{day}</Header>
            <Timeslot>All Day</Timeslot>
            <Timeslots />
          </Day>
        );
      })}
    </Wrapper>
  );
};

const day = ({}) => {
  return (
    <TimeList>
      {timeslots.map((timeslot) => {
        return <Timeslot key={timeslot}>{timeslot}</Timeslot>;
      })}
    </TimeList>
  );
};

const Header = styled.h4`
  margin: 2rem 0 0 0;
`;

const Timeslot = styled.li`
  display: flex;
  margin: 1rem 0;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  list-style: none;
  border-radius: 0.8rem;
  border: 1px solid ${(props) => props.theme.colours['grey-light1']};

  &:hover {
    color: ${(props) => props.theme.colours['grey-light1']};
  }
`;

const Timeslots = styled(day)`
  background-color: red;
  margin: 0;
`;

const TimeList = styled.ul`
  width: 100%;
  margin: 0;
  padding-left: 0;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 14%;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const AvailabilityTable: React.FC<AvailabilityTableProps> = ({}) => {
  return <Week />;
};

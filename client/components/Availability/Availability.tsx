import React from 'react';
import styled from 'styled-components';
import AvailabilityTable from '../AvailabilityTable';

interface AvailabilityProps {}

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const Week = styled.div`
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid ${(props) => props.theme.colours['grey-light1']};
  &:before {
    content: '<';
    color: ${(props) => props.theme.colours.lightblue};
    padding: 0 0.5rem;
  }
  &:after {
    content: '>';
    color: ${(props) => props.theme.colours.lightblue};
    padding: 0 0.5rem;
  }
`;

export const Availability: React.FC<AvailabilityProps> = ({}) => {
  return (
    <main>
      <Heading>
        <h3>Weekly Availability</h3>
        <Week>December 21 — December 25th </Week>
      </Heading>
      <AvailabilityTable />
    </main>
  );
};

// TODO
// Add ability to change color of meeting to match category

import React from 'react';
import styled from 'styled-components';
import formatDate from '../../util/dateFormatter';

interface MeetingProps {
  title: string;
  timeslot: string;
}

export const Meeting: React.FC<MeetingProps> = (props) => {
  const dateString = props.timeslot;

  return (
    <MeetingItem>
      <Title>{props.title}</Title>
      <Timeslot>{formatDate(dateString)}</Timeslot>
    </MeetingItem>
  );
};

const MeetingItem = styled.section`
  width: 35rem;
  margin-bottom: 5rem;
  border-radius: 0 1.5rem 1.5rem 0;
  color: white;
  background-color: ${(props) => props.theme.colours['red-light2']};
  border-left: 2.5rem solid ${(props) => props.theme.colours['red-dark2']};
`;

const Title = styled.h2`
  padding: 1.5rem 1.5rem 0.5rem 1.5rem;
`;

const Timeslot = styled.p`
  padding: 0 1.5rem 5rem 1.5rem;
`;

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

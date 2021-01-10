import React from 'react';
import styled from 'styled-components';
import Timeslot from '../Timeslot';

interface SelectTimeListProps {}

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

export const SelectTimeList: React.FC<SelectTimeListProps> = ({}) => {
  return (
    <>
      {/* <CheckboxInput name='timeslot'></CheckboxInput> */}
      {timeslots.map((timeslot) => {
        return <Timeslot timeslot={timeslot}></Timeslot>;
      })}
    </>
  );
};

import React from 'react';
import SelectDetails from '../SelectDetails';
import SelectTimeList from '../SelectTimeList';

interface SelectTimeProps {}

export const SelectTime: React.FC<SelectTimeProps> = ({}) => {
  return (
    <>
      <h1>Select Time</h1>
      <SelectDetails />
      <SelectTimeList />
    </>
  );
};

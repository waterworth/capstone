import React from 'react';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import { Field, Formik, useField } from 'formik';
import * as moment from 'moment';

interface DatepickerProps {
  value?: string;
  name: string;
  label: string;
  handleChange: any;
}

export const Datepicker: React.FC<DatepickerProps> = ({
  name,
  label,
  handleChange,
}) => {
  const valid = (current: any) => {
    return current.day() !== 0 && current.day() !== 6;
  };

  return (
    <>
      <label htmlFor='timeslot'>{label}</label>
      <Field>
        {({ field, form }: any) => (
          <Datetime
            isValidDate={valid}
            initialValue={new Date()}
            onChange={(time) => {
              handleChange(time.format());
            }}
          />
        )}
      </Field>
    </>
  );
};

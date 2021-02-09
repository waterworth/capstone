// TODO
// Add UserList component
// Add functionality (submit) / make sure form works

import { Form, Formik, Field, FormikProps } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import FormInput from '../FormInput';
import { TextAreaInput, NumberInput } from '../FormInput/';
import UserList from '../UserList';
import { useRouter } from 'next/router';
import { useCreateMeetingMutation } from '../../generated/graphql';
import { Datepicker } from '../DatePicker/Datepicker';
import { string } from 'yup/lib/locale';

interface MeetingFormProps {}

const initialValues = {
  title: '',
  timeslot: '',
  length: 0,
  description: '',
};

export const MeetingForm: React.FC<MeetingFormProps> = ({}) => {
  const router = useRouter();
  const [createMeeting] = useCreateMeetingMutation();
  const [timeslot, setTimeslot] = useState('');

  const handleTimeslotChange = (time: string) => {
    setTimeslot(time);
    console.log(timeslot);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ title, length, description }) => {
        console.log(title, typeof title);
        console.log(timeslot, typeof timeslot);
        console.log(length, typeof length);
        console.log(description, typeof description);
        const { data, errors } = await createMeeting({
          variables: {
            title: title,
            timeslot: timeslot,
            length: length,
            description: description,
          },
        });
        if (!errors) {
          router.push(('/meeting/' + data?.createMeeting?.id) as string);
        }
        await console.log(data?.createMeeting?.id);
      }}>
      {(props: FormikProps<MeetingFormProps>) => (
        <FormWrapper>
          <Datepicker
            value={timeslot}
            name='timeslot'
            label='Meeting Time'
            handleChange={handleTimeslotChange}
          />

          <Right>
            <FormInput
              name='title'
              label='Meeting Title'
              placeholder='Add a title'
            />
            <TextAreaInput
              name='description'
              label='Description'
              placeholder='Add a description'
            />
            <NumberInput name='length' label='Estimated Length' />
            <Button content='Continue' />
          </Right>
        </FormWrapper>
      )}
    </Formik>
  );
};

const FormWrapper = styled(Form)`
  display: flex;
  gap: 8.5rem;
`;

const Left = styled.section`
  width: 40%;
`;
const Right = styled.section``;

// TODO
// Add UserList component
// Add functionality (submit) / make sure form works

import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import FormInput from '../FormInput';
import { TextAreaInput } from '../FormInput/';
import UserList from '../UserList';
import { useRouter } from 'next/router';

interface MeetingFormProps {}

const initialValues = {
  title: '',
  timeslot: '',
  length: 0,
  description: '',
  userIds: [],
};

export const MeetingForm: React.FC<MeetingFormProps> = ({}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <FormWrapper>
        <Left>
          <FormInput
            name='participants'
            label='Participants'
            placeholder='Search for users'
          />
          <UserList />
        </Left>
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
          <FormInput name='length' label='Estimated Length' />
          <Button content='Continue' />
        </Right>
      </FormWrapper>
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

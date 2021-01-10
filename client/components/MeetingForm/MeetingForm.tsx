// TODO
// Add UserList component
// Add functionality (submit) / make sure form works

import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import FormInput from '../FormInput';
import { TextAreaInput } from '../FormInput/';

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
          <FormInput name='participants' label='Participants' />
          {/* UserList component goes here */}
        </Left>
        <Right>
          <FormInput name='title' label='Meeting Title' />
          <TextAreaInput name='description' label='Description' />
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

const Left = styled.section``;
const Right = styled.section``;

import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { number } from 'yup/lib/locale';
import {
  MeetingInput,
  useCreateMeetingMutation,
  useMeQuery,
  useUsersQuery,
} from '../generated/graphql';
import { useIsAuth } from '../util/useIsAuth';

const CreateMeeting: React.FC<{}> = ({}) => {
  const [userList, setUserList] = useState([]);
  const [createMeeting] = useCreateMeetingMutation();
  const { data } = useUsersQuery();
  const { data: medata } = useMeQuery();
  const router = useRouter();
  useIsAuth();

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          timeslot: '',
          length: number,
          description: '',
          userIds: [medata?.me?.id],
        }}
        onSubmit={async (values) => {
          console.log(values);
          const { errors } = await createMeeting({
            variables: { input: values },
          });
          if (!errors) {
            console.log(values);
            router.push('/');
          }
          console.log(errors);
        }}>
        {({ setFieldValue }) => (
          <Form>
            {/* Title */}
            <label htmlFor='title'>Title:</label>
            <Field name='title' placeholder='Title' required />
            <br />
            {/* Timeslot */}
            <label htmlFor='timeslot'>Timeslot:</label>
            <Field name='timeslot'>
              {(field, form, meta) => (
                <Datetime
                  initialValue={new Date()}
                  timeConstraints={{
                    hours: { min: 9, max: 15, step: 2 },
                    minutes: { min: 0, max: 45, step: 15 },
                  }}
                  onChange={(time) => {
                    setFieldValue('timeslot', time.format('MM/DD/YYYY HH:MM'));
                  }}
                />
              )}
            </Field>
            <label htmlFor='length'>Length of Meeting(hr)</label>
            <Field name='length' type='number' required></Field>
            <label htmlFor='description'>Meeting details</label>
            <Field
              as='textarea'
              name='description'
              type='textarea'
              required></Field>
            <br />

            {/* Change this to add to meeting */}
            <label htmlFor='participants'>Add participants to meeting</label>
            {!data ? (
              <p>Loading users...</p>
            ) : (
              data.users.map((user) => (
                <div
                  key={user.id}
                  onClick={(e) => {
                    setUserList([...userList, user.id]);
                    setFieldValue('userIds', userList);
                  }}>
                  {user.username}
                </div>
              ))
            )}
            {/* Submit */}
            <button type='submit'>Create Meeting</button>
          </Form>
        )}
      </Formik>

      <br />
    </div>
  );
};

export default CreateMeeting;

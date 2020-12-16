import { Field, Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { number } from 'yup/lib/locale';
import { useCreateMeetingMutation, useUsersQuery } from '../generated/graphql';
import { createUrqlClient } from '../util/createUrqlClient';
import { useIsAuth } from '../util/useIsAuth';

const CreateMeeting: React.FC<{}> = ({}) => {
  const [userList, setUserList] = useState([]);
  const [, createMeeting] = useCreateMeetingMutation();
  const [{ data }] = useUsersQuery();
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
          users: [],
        }}
        onSubmit={async (values) => {
          const { error } = await createMeeting({ input: values });
          if (!error) {
            console.log(values);
            router.push('/');
          }
          console.log(error);
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
                    setFieldValue(
                      'timeslot',
                      time.format('YYYY-MM-DD hh:mm:ss')
                    );
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
                    // if (!userList.includes(e.target.innerText)) {
                    setUserList([...userList, e.target.innerText]);
                    setFieldValue('users', userList);
                    console.log(userList);
                    // }
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

export default withUrqlClient(createUrqlClient)(CreateMeeting);

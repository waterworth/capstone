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
  const [userSearch, setUserSearch] = useState();
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
            // router.push('/');
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
            <Field
              name='timeslot'
              render={() => (
                <Datetime
                  onChange={(time) => {
                    setFieldValue(
                      'timeslot',
                      time.format('YYYY-MM-DD hh:mm:ss')
                    );
                  }}
                />
              )}
            />
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
            <Field
              onChange={(e: any) => setUserSearch(e.target.value)}
              name='participants'></Field>
            {!data ? (
              <p>Loading users...</p>
            ) : (
              data.users.map((user) => (
                <div
                  key={user.id}
                  onClick={(e) => {
                    if (!userList.includes(e.target.textContent)) {
                      setUserList([...userList, e.target.textContent]);
                      setFieldValue('users', userList);
                    }
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

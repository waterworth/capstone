import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Datetime from 'react-datetime';
import * as moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Header from '../components/Header/';
import styles from '../styles/createmeeting.module.scss';
import {
  useCreateMeetingMutation,
  useMeQuery,
  useUsersQuery,
} from '../generated/graphql';
import { useIsAuth } from '../util/useIsAuth';
import { useApolloClient } from '@apollo/client';

interface MomentString {
  format: typeof moment;
}

const CreateMeeting: React.FC<{}> = ({}) => {
  const [userList, setUserList] = useState([] as number[]);
  const [selected, setSelected] = useState([] as string[]);
  const [userIds, setUserIds] = useState([] as number[] | undefined);
  const [createMeeting] = useCreateMeetingMutation();
  const { data } = useUsersQuery();
  const { data: medata } = useMeQuery();
  const router = useRouter();
  const apolloClient = useApolloClient();
  useIsAuth();

  return (
    <main className={styles.createmeeting}>
      <Header title='Create Meeting' />
      <Formik
        initialValues={{
          title: '',
          timeslot: '',
          length: 0,
          description: '',
          userIds: [],
        }}
        onSubmit={async (values) => {
          const { errors } = await createMeeting({
            variables: { input: values },
          });
          if (!errors) {
            await apolloClient.resetStore();
            router.push('/');
          }
        }}>
        {({ setFieldValue }) => (
          <Form className={styles.createmeeting__form}>
            {/* Title */}
            <label className={styles.createmeeting__label} htmlFor='title'>
              Title:
            </label>
            <Field
              className={styles.createmeeting__input}
              name='title'
              placeholder='Title'
              required
            />
            <br />
            {/* Timeslot */}
            <label className={styles.createmeeting__label} htmlFor='timeslot'>
              Timeslot:
            </label>
            <Field className={styles.createmeeting__input} name='timeslot'>
              {() => (
                <Datetime
                  dateFormat='MM/DD/YY HH:MM'
                  initialValue={new Date()}
                  timeConstraints={{
                    hours: { min: 9, max: 15, step: 2 },
                    minutes: { min: 0, max: 45, step: 15 },
                  }}
                  onChange={(time) => {
                    setFieldValue('timeslot', time);
                  }}
                />
              )}
            </Field>
            <label className={styles.createmeeting__label} htmlFor='length'>
              Length of Meeting(hr)
            </label>
            <Field
              className={styles.createmeeting__input}
              name='length'
              type='number'
              required></Field>
            <label
              className={styles.createmeeting__label}
              htmlFor='description'>
              Meeting details
            </label>
            <Field
              className={styles.createmeeting__input}
              as='textarea'
              name='description'
              type='textarea'
              required></Field>
            <br />

            {/* Change this to add to meeting */}
            <label
              className={styles.createmeeting__label}
              htmlFor='participants'>
              Add participants to meeting
            </label>
            {!data ? (
              <p>Loading users...</p>
            ) : (
              data.users.map((user) => (
                <div
                  className={styles.createmeeting__user}
                  key={user.id}
                  onClick={(e) => {
                    {
                      if (!userList.includes(user.id)) {
                        setUserList([...userList, user.id]);
                        setFieldValue('userIds', userList);
                      } else {
                        setUserList(userList.filter((user) => user !== user));
                      }
                    }

                    if (!selected.includes(user.username)) {
                      setSelected([...selected, user.username]);
                    }
                  }}>
                  {userList.includes(user.id) ? <p>✅</p> : null}
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
    </main>
  );
};

export default CreateMeeting;

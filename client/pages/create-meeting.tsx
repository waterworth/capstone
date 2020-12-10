import { Formik, Form, Field } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useCreateMeetingMutation } from '../generated/graphql';
import { createUrqlClient } from '../util/createUrqlClient';
import { useIsAuth } from '../util/useIsAuth';

const CreateMeeting: React.FC<{}> = ({}) => {
  const [, createMeeting] = useCreateMeetingMutation();
  const router = useRouter();
  useIsAuth();

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          timeslot: '',
        }}
        onSubmit={async (values) => {
          const { error } = await createMeeting({ input: values });
          if (!error) {
            router.push('/');
          }
        }}>
        {({ errors, touched }) => (
          <Form>
            <label htmlFor='title'>Title:</label>
            <Field name='title' placeholder='Title' />

            {errors.title && touched.title ? <div>{errors.title}</div> : null}

            <label htmlFor='timeslot'>Timeslot:</label>
            <Field name='timeslot' placeholder='timeslot' />

            {errors.timeslot && touched.timeslot ? (
              <div>{errors.timeslot}</div>
            ) : null}

            <button type='submit'>Login</button>
            <Link href='/forgot-password'>Forgot Password?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(CreateMeeting);

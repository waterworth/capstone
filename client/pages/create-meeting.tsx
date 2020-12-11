import { Field, Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { number } from 'yup/lib/locale';
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
          length: number,
        }}
        onSubmit={async (values) => {
          const { error } = await createMeeting({ input: values });
          if (!error) {
            router.push('/');
          }
          console.log(error);
        }}>
        {({ setFieldValue }) => (
          <Form>
            {/* Title */}
            <label htmlFor='title'>Title:</label>
            <Field name='title' placeholder='Title' required/>
            <br />

            {/* Timeslot */}
            <label htmlFor='timeslot'>Timeslot:</label>
            <Field
              name='timeslot'
              render={() => (
                <Datetime
                  onChange={(time) => {
                    setFieldValue('timeslot', time.format('YYYY-MM-DD hh:mm:ss'));
                  }}
                />
              )}
            />

            <label htmlFor="length">Length of Meeting(hr)</label>
            <Field name="length" type="number" required></Field>

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

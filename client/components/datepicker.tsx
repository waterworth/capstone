import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import { useField, Form, FormikProps, Formik } from 'formik';

interface Values {
  timeslot: Date;
}

const Datepicker = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
      <Datetime {...field} {...props} />
  );
};

export default Datepicker;


      <Formik
        initialValues={{
          time: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          // setTimeout(() => {
          setSubmitting(false);
          // alert(JSON.stringify(values, null, 2));
          // }, 500);
        }}
        render={({ submitForm, isSubmitting, values, setFieldValue }) => (
          <Form>
            <Field
              name="time"
              render={({ field, form: { isSubmitting } }) => (
                <Datetime
                  onChange={time => {
                    setFieldValue("time", time.format("YYYY-MM-DD"));
                  }}
                />
              )}
            />
            
          </Form>
        )}
      />
    </div>
  );
}
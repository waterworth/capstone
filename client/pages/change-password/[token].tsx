import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../util/createUrqlClient';
import { toErrorMap } from '../../util/toErrorMap';


const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
    return(
        <div>
      <h1>Change Password</h1>
      <Formik
        initialValues={{
          newPassword: '',
        }}
        onSubmit={async (values) => {
          const response = await changePassword({newPassword: values.newPassword, token: typeof router.query.token === "string" ? router.query.token : ''});
          if(response.data?.changePassword.errors){
            const errorMap = toErrorMap(response.data.changePassword.errors)
            if('token' in errorMap){
              setTokenError(errorMap.token)
            }
          } else if (response.data?.changePassword.user){
            router.push('/')
          }
        }}>
        {({ errors, touched }) => (
          <Form>
            <label htmlFor='newPassword'>New Password:</label>
            <Field name='newPassword' type="password" />
            {tokenError ? (
              <>
              <div>{tokenError}</div>
              <Link href="/forgot-password">
                Request a new password
              </Link> 
              </>
              ): null}
            
            <button type='submit'>Change Password</button>

          </Form>
        )}
      </Formik>
    </div>
    );
}


export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword);
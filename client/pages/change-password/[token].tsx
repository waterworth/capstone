import { Formik, Form, Field } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../util/createUrqlClient';
import { toErrorMap } from '../../util/toErrorMap';
import login from '../login';


const ChangePassword: NextPage<{token:string}> = ({token}) => {
  const router = useRouter();
  const [fetching, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
    return(
        <div>
      <h1>Change Password</h1>
      <Formik
        initialValues={{
          newPassword: '',
        }}
        onSubmit={async (values) => {
          const response = await changePassword({newPassword: values.newPassword, token});
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
            {tokenError ? <div>{tokenError}</div> : null}
            
            <button type='submit'>Change Password</button>

          </Form>
        )}
      </Formik>
    </div>
    );
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword);
import { Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { number } from 'yup/lib/locale';
import {
  useCreateMeetingMutation,
  useMeQuery,
  useUserByIdQuery,
  useUsersQuery,
} from '../../generated/graphql';
import Button from '../Button';
import Link from 'next/link';
// import { useIsAuth } from '../util/useIsAuth';

const Wrapper = styled.div`
  padding: 3rem;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: row;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const StyledField = styled(Field)`
  margin-top: 0.5rem;
  width: 30rem;
  height: 2rem;
  border: 1px solid ${(props) => props.theme.colours['grey-dark2']};
  border-radius: 0.4rem;
  color: ${(props) => props.theme.colours.black};
`;
const Left = styled.section`
  width: 50%;
  height: 80vh;
`;
const Right = styled.section`
  width: 50%;
`;

const Textarea = styled(Field)`
  resize: none;
  margin-top: 0.5rem;
  width: 30rem;
  height: 10rem;
  border: 1px solid ${(props) => props.theme.colours['grey-dark2']};
  border-radius: 0.4rem;
  margin-bottom: 0.5rem;
`;

const DatePicker = styled(Datetime)`
  margin-top: 1rem;
  height: 2rem;
`;
const User = styled.div`
  border: 1px solid ${(props) => props.theme.colours['grey-light1']};
  padding: 1rem;
  border-radius: 0.3rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.colours['grey-light1']};
  }
`;

const InputWrapper = styled.div`
  margin: 1rem 0;
`;

const CreateMeeting: React.FC<{}> = ({}) => {
  const [userById, setUserById] = useState();
  const [userList, setUserList] = useState([]);
  const [createMeeting] = useCreateMeetingMutation();

  const { data: userdata } = useUserByIdQuery({
    variables: {
      id: userById,
    },
  });

  console.log(userdata?.userById);
  const { data } = useUsersQuery();
  const { data: medata } = useMeQuery();
  const router = useRouter();
  //   useIsAuth();

  console.log(userList);
  return (
    <Wrapper>
      <Formik
        initialValues={{
          title: '',
          timeslot: '',
          length: number,
          description: '',
          users: [],
        }}
        onSubmit={async (values) => {
          console.log(values);
          const { errors } = await createMeeting({
            variables: {
              input: values,
            },
          });
          if (!errors) {
            console.log(values);
            router.push('/');
          }
          console.log(errors);
        }}>
        {({ setFieldValue }) => (
          <StyledForm>
            <Left>
              {/* Title */}
              <InputWrapper>
                <Label htmlFor='title'>Title</Label>
                <StyledField name='title' placeholder='Title' required />
              </InputWrapper>
              {/* Timeslot */}
              <InputWrapper>
                <Label htmlFor='timeslot'>Timeslot</Label>
                <Field name='timeslot'>
                  {(field, form, meta) => (
                    <DatePicker
                      initialValue={new Date()}
                      timeConstraints={{
                        hours: { min: 1, max: 12, step: 1 },
                        minutes: { min: 0, max: 45, step: 1 },
                      }}
                      onChange={(time) => {
                        setFieldValue(
                          'timeslot',
                          time.format('MM/DD/YYYY HH:MM')
                        );
                      }}
                    />
                  )}
                </Field>
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor='length'>Length of Meeting(hr)</Label>
                <StyledField name='length' type='number' required></StyledField>
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor='description'>Meeting details</Label>
                <Field
                  as='textarea'
                  name='description'
                  type='textarea'
                  required></Field>
              </InputWrapper>
            </Left>
            <Right>
              {/* Change this to add to meeting */}
              <InputWrapper>
                <Label htmlFor='participants'>
                  Add participants to meeting
                </Label>
                {!data ? (
                  <p>Loading users...</p>
                ) : (
                  data.users.map((user) => (
                    <User
                      key={user.id}
                      onClick={async (e) => {
                        await setUserById(parseInt(user?.id));
                        await setUserList([...userList, userdata?.userById]);
                        await setFieldValue('users', userList);
                      }}>
                      {user.username}
                    </User>
                  ))
                )}
              </InputWrapper>
              {/* Submit */}

              <Button content='Create Meeting'>
                <Link href='/' />
              </Button>
            </Right>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default CreateMeeting;

import { Formik, FormikProps, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { contextType } from 'react-datetime';
import styled from 'styled-components';
import {
  useAddUsersToMeetingMutation,
  useAddUserToTeamMutation,
  useCreateTeamMutation,
  useMeQuery,
} from '../../generated/graphql';
import Button from '../Button';
import FormInput from '../FormInput';

interface CreateTeamProps {}

const InputWrapper = styled.div`
  display: flex;
  width: 30rem;
  gap: 2rem;
`;
const ButtonWrapper = styled.div`
  margin-left: 7rem;
`;

export const CreateTeam: React.FC<CreateTeamProps> = ({}) => {
  const router = useRouter();
  const { data } = useMeQuery();
  const [createTeamMutation] = useCreateTeamMutation();
  const [addUserToTeamMutation] = useAddUserToTeamMutation();
  const initialValues = {
    name: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        console.log(values);
        actions.setSubmitting(true);

        const response = await createTeamMutation({
          variables: {
            name: values.name,
          },
        });
        if (response.data?.createTeam?.id && data?.me?.id) {
          await addUserToTeamMutation({
            variables: {
              userId: parseInt(data?.me?.id),
              teamId: response.data.createTeam.id,
            },
          });
          router.push('/');
        }
      }}>
      {(props: FormikProps<any>) => (
        <Form>
          <InputWrapper>
            <FormInput name='name' label='Team Name' placeholder='Team Name' />
          </InputWrapper>

          <ButtonWrapper>
            <Button content='Create Team' />
          </ButtonWrapper>
        </Form>
      )}
    </Formik>
  );
};

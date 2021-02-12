import { Formik, FormikProps, Form } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useAddUserToTeamMutation,
  useMeQuery,
  useTeamsQuery,
} from '../../generated/graphql';
import Button from '../Button';
import FormInput from '../FormInput';

interface JoinTeamProps {}

const InputWrapper = styled.div`
  display: flex;
  width: 30rem;
  gap: 2rem;
`;
const ButtonWrapper = styled.div`
  margin-left: 7rem;
`;

export const JoinTeam: React.FC<JoinTeamProps> = ({}) => {
  const router = useRouter();
  const [teamId, setTeamId] = useState(0);
  const [inTeam, setInTeam] = useState(false);
  const { data } = useTeamsQuery();
  const { data: meData } = useMeQuery();
  const [addUserToTeamMutation] = useAddUserToTeamMutation();
  const initialValues = {
    teamId: 0,
  };

  useEffect(() => console.log(teamId), [teamId]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);

          const response = addUserToTeamMutation({
            variables: {
              userId: parseInt(meData?.me?.id!),
              teamId: teamId,
            },
          });
          response.then(() => router.push('/'));
        }}>
        {(props: FormikProps<any>) => (
          <Form>
            <ul>
              {data?.teams?.map((team) => (
                <li key={team?.id}>
                  <p>{team?.name}</p>
                  {}

                  <button
                    name='teamId'
                    type='submit'
                    disabled={team?.users?.some(
                      (user) => user?.username == meData?.me?.username
                    )}
                    onClick={async () => {
                      setTeamId(team?.id!);
                    }}>
                    Join Team
                  </button>
                </li>
              ))}
            </ul>
          </Form>
        )}
      </Formik>
    </>
  );
};

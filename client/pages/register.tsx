import React from 'react';
import * as Yup from 'yup';
import RegisterForm from '../components/RegisterForm';
import styled from 'styled-components';
import Divider from '../components/Divider';

const Main = styled.main`
  margin: 3rem;
  width: 70%;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <>
      <section>
        <p>
          Welcome to your new home for creating schedules and managing your
          teams time!
        </p>
      </section>
      <Main>
        <Section>
          <h1>Register</h1>
          <h2>Manage your schedules and meetings effectively.</h2>
          <p>
            Let’s get you all set up so you can begin setting up your profile
          </p>
          <Divider />
        </Section>
        <RegisterForm />
      </Main>
    </>
  );
};

export default Register;

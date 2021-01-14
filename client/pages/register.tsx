// TODO add logo

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

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Left = styled.section`
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: solid 1px ${(props) => props.theme.colours['grey-light1']};
`;

const Tagline = styled.p`
  padding: 0 3.5rem;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
`;

const Title = styled.h1`
  font-size: 1.6rem;
`;

const Subhead = styled.p`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0;
`;

const CTA = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colours['grey-dark2']};
`;

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Wrapper>
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Inter', sans-serif;
            width: 100vw;
          }
          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
      <Left>
        <Tagline>
          Welcome to your new home for creating schedules and managing your
          teams time!
        </Tagline>
      </Left>
      <Main>
        <Section>
          <Title>Register</Title>
          <Subhead>Manage your schedules and meetings effectively.</Subhead>
          <CTA>
            Let’s get you all set up so you can begin setting up your profile
          </CTA>
          <Divider />
        </Section>
        <RegisterForm />
      </Main>
    </Wrapper>
  );
};

export default Register;

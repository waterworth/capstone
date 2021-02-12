import React, { useState } from 'react';
import styled from 'styled-components';
import CreateTeam from '../components/CreateTeam';
import Header from '../components/Header';
import JoinTeam from '../components/JoinTeam';
import Layout from '../components/Layout';

interface TeamsProps {}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  overflow: scroll;
`;

const Card = styled.section``;

const Teams: React.FC<TeamsProps> = ({}) => {
  const [view, setView] = useState('');
  console.log(view);
  return (
    <Layout>
      <Wrapper>
        <Header title='Teams' />
        <Card
          onClick={() => {
            setView('create');
          }}>
          <h2>Create a Team</h2>
          <p>Form component to create a team</p>
        </Card>
        <Card
          onClick={() => {
            setView('join');
          }}>
          <h2>Join a Team</h2>
          <p>Form component to join a team</p>
        </Card>

        {view == 'join' ? <JoinTeam /> : null}
        {view == 'create' ? <CreateTeam /> : null}
      </Wrapper>
    </Layout>
  );
};

export default Teams;

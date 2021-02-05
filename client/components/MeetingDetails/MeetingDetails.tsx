// TODO Add user data from profile

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import formatDate from '../../util/dateFormatter';

interface MeetingDetailsProps {
  length: number;
  description: string;
  id?: number;
  title: string;
  timeslot: string;
}

export const MeetingDetails: React.FC<MeetingDetailsProps> = (props) => {
  const dateString = props.timeslot;
  return (
    <Details>
      <Title>{props.title}</Title>

      <Section>
        <Subtitle>Members</Subtitle>
        <section>
          <Image src='https://via.placeholder.com/46' alt='user image' />
          <Image src='https://via.placeholder.com/46' alt='user image' />
          <Image src='https://via.placeholder.com/46' alt='user image' />
        </section>
      </Section>

      <Section>
        <Subtitle>Time</Subtitle>
        <p>{formatDate(dateString)}</p>

        <Subtitle>Length</Subtitle>
        <p>{props.length} hour(s)</p>
      </Section>

      <Section>
        <Subtitle>Description</Subtitle>
        <p>{props.description}</p>
      </Section>

      <Section>
        <Subtitle>Meeting Link</Subtitle>
        <LinkContainer>
          <Image src='https://via.placeholder.com/46' alt='user image' />
          <Link href='/'>
            <StyledLink>Join the call</StyledLink>
          </Link>
        </LinkContainer>
      </Section>
    </Details>
  );
};

const Details = styled.aside`
  box-shadow: 0 1px 18px -5px rgba(35, 33, 33, 0.25);
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  margin-right: 3rem;
  border-top: 0.5rem solid ${(props) => props.theme.colours['red-dark2']};
  overflow: scroll;
`;

const Title = styled.h2`
  margin: 0;
  padding: 2rem;
  border-bottom: solid 1px ${(props) => props.theme.colours['cloud']};
`;

const Section = styled.section`
  padding: 1rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colours['cloud']};
`;

const Image = styled.img`
  padding-right: 0.5rem;
`;

const Subtitle = styled.h3`
  font-size: 0.8rem;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.colours['lightblue-dark2']};
`;
